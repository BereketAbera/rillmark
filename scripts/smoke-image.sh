#!/usr/bin/env bash
# Runs the documentation image the way the cluster does, and checks what Traefik, browsers and agents rely on.
#
#   scripts/smoke-image.sh <image>
#
# <image> is anything `docker run` takes: rillmark-web:local after `docker build -t rillmark-web:local .`, or the
# ghcr.io/bereketabera/rillmark/web@sha256:... digest that .github/workflows/images.yml pulls back from GHCR. The container
# gets what the pod has: a read-only root filesystem with a tmpfs on /tmp, no capabilities and no privilege escalation. It
# listens on a random port of 127.0.0.1 and is removed on every exit. Needs bash, docker, curl, gzip and cksum, and writes no
# files. Exits non-zero if any check fails.
set -euo pipefail

if [[ $# -ne 1 || -z "$1" ]]; then
  echo "usage: $0 <image>" >&2
  exit 2
fi
image="$1"
container="rillmark-smoke-$$-$RANDOM"
NO_CACHE="no-cache"
IMMUTABLE="public, max-age=31536000, immutable"

passes=0
failures=0
finished=no
cleanup() {
  local status=$?
  # set -e ends the script at a failed line with no FAIL of its own, so a log that stops at a PASS must not look finished.
  [[ "$status" -eq 0 || "$finished" == yes ]] || echo "smoke-image: stopped early, with status $status" >&2
  docker rm -f "$container" >/dev/null 2>&1 || true
}
trap cleanup EXIT

pass() { printf 'PASS %s\n' "$*"; passes=$((passes + 1)); }
fail() { printf 'FAIL %s\n' "$*"; failures=$((failures + 1)); }
expect() { # expect <label> <actual> <expected>
  if [[ "$2" == "$3" ]]; then pass "$1: $2"; else fail "$1: got '$2', expected '$3'"; fi
}

# headers <path> [curl arguments...]: the status line and headers of one GET, without carriage returns.
headers() {
  local path="$1"
  shift
  curl -s -m 10 -o /dev/null -D - "$@" "$base$path" 2>/dev/null | tr -d '\r' || true
}
# value <headers> <name>: the first value of that header, or nothing. awk reads all of its input, so printf never meets a
# closed pipe, which under pipefail would read as a failure.
value() {
  printf '%s\n' "$1" | awk -v name="$2" '
    BEGIN { name = tolower(name) }
    !found {
      i = index($0, ":")
      if (i > 1 && tolower(substr($0, 1, i - 1)) == name) { v = substr($0, i + 1); sub(/^[ \t]+/, "", v); print v; found = 1 }
    }'
}
status_of() { printf '%s\n' "$1" | awk 'NR == 1 { print $2 }'; }

# check <path> <status> <Content-Type> <Cache-Control> [curl arguments...]: one GET, and what every response must carry.
# Leaves its headers in $last for the caller.
check() {
  local path="$1" status="$2" type="$3" cache="$4" label server
  shift 4
  label="$path"
  [[ $# -eq 0 ]] || label="$path ($*)"
  last="$(headers "$path" "$@")"
  expect "$label status" "$(status_of "$last")" "$status"
  expect "$label Content-Type" "$(value "$last" content-type)" "$type"
  expect "$label Cache-Control" "$(value "$last" cache-control)" "$cache"
  expect "$label X-Content-Type-Options" "$(value "$last" x-content-type-options)" nosniff
  server="$(value "$last" server)"
  if [[ "$server" == *[0-9]* ]]; then fail "$label Server: '$server' names a version"; else pass "$label Server: '$server', no version"; fi
}

# check_gzip <path> <Content-Type> <Cache-Control>: the Dockerfile wrote a .gz for this file, so gzip_static sends that
# file as it is, with a Content-Length, where compressing on the fly would send it chunked. It must decompress to exactly
# what a client without gzip gets, and that client must get it uncompressed.
check_gzip() {
  local path="$1" type="$2" cache="$3" length encoding plain unzipped
  check "$path" 200 "$type" "$cache" -H 'Accept-Encoding: gzip'
  expect "$path with gzip: Content-Encoding" "$(value "$last" content-encoding)" gzip
  expect "$path with gzip: Vary" "$(value "$last" vary)" Accept-Encoding
  length="$(value "$last" content-length)"
  if [[ -n "$length" ]]; then pass "$path with gzip: sent from its .gz, Content-Length $length"; else fail "$path with gzip: no Content-Length, so compressed on the fly"; fi
  encoding="$(value "$(headers "$path")" content-encoding)"
  if [[ -z "$encoding" ]]; then pass "$path without gzip: sent uncompressed"; else fail "$path without gzip: Content-Encoding '$encoding'"; fi
  plain="$(curl -s -m 10 "$base$path" 2>/dev/null | cksum || true)"
  unzipped="$(curl -s -m 10 -H 'Accept-Encoding: gzip' "$base$path" 2>/dev/null | gzip -dc 2>/dev/null | cksum || true)"
  if [[ "${plain#* }" != 0 && "$unzipped" == "$plain" ]]; then
    pass "$path with gzip: decompresses to the same ${plain#* } bytes"
  else
    fail "$path with gzip: decompresses to cksum '$unzipped', the plain file is '$plain'"
  fi
}

docker run --detach --name "$container" --read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges \
  --publish 127.0.0.1::8080 "$image" >/dev/null
port="$(docker port "$container" 8080/tcp | awk -F: 'NR == 1 { print $NF }')"
[[ "$port" =~ ^[0-9]+$ ]] || { echo "smoke-image: $image publishes no port for 8080/tcp" >&2; exit 1; }
base="http://127.0.0.1:$port"
printf '== %s, as %s on %s\n' "$image" "$container" "$base"

for attempt in $(seq 1 30); do
  [[ "$(curl -s -o /dev/null -m 2 -w '%{http_code}' "$base/healthz" 2>/dev/null || true)" != 200 ]] || break
  if [[ "$attempt" -eq 30 || "$(docker inspect --format '{{.State.Running}}' "$container")" != true ]]; then
    docker logs "$container" 2>&1 | tail -n 20 >&2
    echo "smoke-image: $image did not answer /healthz with 200" >&2
    exit 1
  fi
  sleep 1
done

expect "image user" "$(docker inspect --format '{{.Config.User}}' "$container")" 101

check / 200 "text/html; charset=utf-8" "$NO_CACHE"
check /llms.txt 200 "text/plain; charset=utf-8" "$NO_CACHE"
check /api.json 200 "application/json; charset=utf-8" "$NO_CACHE"
check /docs/ai.md 200 "text/markdown; charset=utf-8" "$NO_CACHE"
check /source/button.tsx 200 "text/plain; charset=utf-8" "$NO_CACHE"
check /exploration.html 200 "text/html; charset=utf-8" "$NO_CACHE"
check /healthz 200 "text/plain; charset=utf-8" no-store
expect "/healthz body" "$(curl -s -m 10 "$base/healthz" 2>/dev/null || true)" ok
# Hash routing has no history fallback, so a path with no file is a real 404, and one nobody may keep.
check /nope 404 "text/html; charset=utf-8" "$NO_CACHE"
check /docs/missing.md 404 "text/html; charset=utf-8" "$NO_CACHE"

# The real hashed names, as this build's index.html links them. Vite's hashes are base64url.
html="$(curl -s -m 10 "$base/" 2>/dev/null || true)"
js_name='/assets/[A-Za-z0-9_.-]+\.js'
css_name='/assets/[A-Za-z0-9_.-]+\.css'
js=""
css=""
if [[ "$html" =~ $js_name ]]; then js="${BASH_REMATCH[0]}"; fi
if [[ "$html" =~ $css_name ]]; then css="${BASH_REMATCH[0]}"; fi
if [[ -n "$js" ]]; then
  check "$js" 200 "application/javascript; charset=utf-8" "$IMMUTABLE"
else
  fail "index.html links no /assets/*.js"
fi
if [[ -n "$css" ]]; then
  check "$css" 200 "text/css; charset=utf-8" "$IMMUTABLE"
else
  fail "index.html links no /assets/*.css"
fi
# A hashed name that is gone answers 404, and a browser must ask again rather than keep that for a year.
check /assets/missing-AbCd1234.js 404 "text/html; charset=utf-8" "$NO_CACHE"

check_gzip / "text/html; charset=utf-8" "$NO_CACHE"
check_gzip /llms.txt "text/plain; charset=utf-8" "$NO_CACHE"
check_gzip /api.json "application/json; charset=utf-8" "$NO_CACHE"
check_gzip /docs/ai.md "text/markdown; charset=utf-8" "$NO_CACHE"
check_gzip /source/button.tsx "text/plain; charset=utf-8" "$NO_CACHE"
[[ -z "$js" ]] || check_gzip "$js" "application/javascript; charset=utf-8" "$IMMUTABLE"
[[ -z "$css" ]] || check_gzip "$css" "text/css; charset=utf-8" "$IMMUTABLE"

finished=yes
if [[ "$failures" -gt 0 ]]; then
  docker logs "$container" 2>&1 | tail -n 20 >&2
  echo "smoke-image: $failures of $((passes + failures)) checks failed for $image" >&2
  exit 1
fi
echo "smoke-image: all $passes checks passed for $image"

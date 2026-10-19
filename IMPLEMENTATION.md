# Implementation checklist

## Container image (deploy/k3s)

- [x] Serve `dist/`, and nothing of the base image's, from nginx-unprivileged: real 404s under hash routing, directories included, UTF-8 Markdown and TSX, immutable hashed assets, revalidating stable names, and cache and security headers on every response, errors included.
- [x] Precompress text files at level 9 in the build stage for `gzip_static`, with on-the-fly gzip as the fallback. The runtime stage stays COPY-only.
- [x] `scripts/smoke-image.sh` and `.github/workflows/images.yml`: build and smoke on pull requests; on main, push both platforms to GHCR, then smoke and scan the `linux/amd64` digest and record the digests.
- [x] No external Dockerfile frontend: BuildKit's built-in one reads the Dockerfile, so no build fetches `docker/dockerfile` by a tag.
- [ ] First runs on GitHub. Neither job of `images.yml` has run yet.
- [ ] Deployment at rillmark.bereket.dev, through the plane-platform repository. The Vercel deployment stays until the owner retires it.
- [ ] Pin the BuildKit image. `docker/setup-buildx-action` starts `moby/buildkit:buildx-stable-1`, a Docker Hub tag that can move, and that image now supplies the Dockerfile frontend as well. `driver-opts: image=moby/buildkit:<version>@sha256:<digest>` would pin it. plane-platform has the same gap, so change both together.

Verified on the arm64 Mac only: the image builds, and `scripts/smoke-image.sh` passes all 158 checks on it and, under emulation, on the `linux/amd64` build. A cache-only two-platform build ran the build stage once and only copied into each runtime stage. A text file without a `.gz` was still compressed on the fly. Only CI can prove the rest: the native `linux/amd64` run, the GHCR push and pull-back with `GITHUB_TOKEN`, trivy's download, checksum and scan result, and the summary and artifact.

## 0.2 expansion

- [x] Research established theme APIs and choose independent preset/appearance attributes.
- [x] Ship Fieldnotes, Studio and Play as coordinated color, shape, type and motion tokens.
- [x] Add 16 components, compiling demos and focused interaction coverage.
- [x] Add complete project onboarding and activity inbox examples.
- [x] Add a live preset explorer, persistent site controls and consumer documentation.
- [x] Verify all six palettes, responsive workflows, portal inheritance, system preference and both packed CSS paths.
- [x] Publish a verified 0.2.0 package, deploy documentation and push coherent commits to BereketAbera.

Rillmark 0.2.0 is published on npm and deployed at https://rillmark.vercel.app. It has 48 components, five full examples and three independent visual presets. All 45 unit tests and 42 local headed test cases pass, as do five targeted production cases. Both fresh local-tarball and public-registry consumers pass every styling/preset check, including CSS-only system preference and runtime shadows. Public package integrity matches the exact tested artifact. Source remains private under BereketAbera/rillmark.

## 0.1 release

- [x] Initialize Git and inspect workspace guidance.
- [x] Lightweight name check: Rillmark, no matching UI library found (2026-11-03; not trademark clearance).
- [x] Research reference systems and explore three small same-screen directions.
- [x] Select Fieldnotes; implement canonical tokens, light/dark themes and Radix primitives.
- [x] Implement all 31 requested components plus EmptyState and the practical patterns.
- [x] Build searchable documentation and three complete working example screens.
- [x] Generate focused API/docs/examples and an installable npm-consuming agent skill.
- [x] Use independent npm distribution and remove obsolete installer tooling.
- [x] Package independent JavaScript, declarations, styles, tokens and editable TypeScript source.
- [x] Complete packed-package verification, including project-scoped Codex/Claude skill installation.
- [x] Verify all components and workflows in headed browsers locally and on the public site; record observed hosting delays.
- [x] Publish the exact tested rillmark@0.1.0 package to npm.
- [x] Deploy the independent documentation and bundled-skill instructions to Vercel.
- [x] Commit work in coherent chunks and push to the private BereketAbera/rillmark repository.

## Initial release checkpoint

The independent release is implemented and published as rillmark@0.1.0 on npm, with documentation at https://rillmark.vercel.app. Canonical code is in packages/rillmark/src; the package includes JavaScript, declarations, both styling paths, editable source and the verified consuming skill. All 21 unit tests and 17 local headed browser tests pass. Public-site checks and observed network delays are documented in docs/verification.md. GitHub source is private under BereketAbera/rillmark; do not use another account. Commit messages and current files have been cleaned up while preserving the progress history. Hosted CI is queued without an assigned runner; local release checks are complete.

## Scope

React 19, TypeScript, original tokens and components, Radix primitives, precompiled CSS with optional Tailwind CSS 4 integration. Standard npm publication, focused AI documentation and an installable consuming skill. No custom CLI, MCP server or configuration framework.

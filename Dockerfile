# The documentation site, as a static image for rillmark.bereket.dev.
#
# The build stage runs on the builder's own platform, because its output (dist/) is plain files that run anywhere. The
# runtime stage is nginx-unprivileged, so the same Dockerfile gives linux/amd64 for the VPS and linux/arm64 for a laptop.
# Keep the runtime stage to COPY alone: .github/workflows/images.yml builds linux/arm64 on an x86-64 runner with no
# emulation, which a RUN there would need. Both base images are pinned by digest; bump the tag and the digest together.
# There is no syntax directive: BuildKit's built-in Dockerfile frontend reads all of this, and an external one would be
# one more image that every build fetches from Docker Hub, by a tag that can move.
ARG NODE_IMAGE=node:24.22.2-alpine@sha256:a34ab6d7f6f4813f4d0c5469d74685604b962fbdbf5793a7bc7b4998ecb867c8
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.30.6-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS build
WORKDIR /src
ENV CI=true NPM_CONFIG_UPDATE_NOTIFIER=false NPM_CONFIG_FUND=false
COPY package.json package-lock.json ./
RUN npm ci --no-audit
COPY . .
# npm run build regenerates public/docs, public/source and src/generated before vite build, as it does locally.
# Then every text file of at least 1024 bytes, nginx's gzip_min_length, gets a .gz beside it at level 9, which gzip_static
# sends as it is instead of compressing each response. BusyBox gzip writes no file name or time into it.
RUN npm run build \
 && test -f dist/index.html \
 && test -f dist/llms.txt \
 && find dist -type f -size +1023c \
      \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.json' -o -name '*.md' -o -name '*.tsx' -o -name '*.txt' -o -name '*.svg' \) \
      -exec gzip -9 -k {} + \
 && test -f dist/index.html.gz

FROM ${NGINX_IMAGE} AS runtime
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# Into a directory the base image leaves empty, so the site is dist/ and nothing more. A COPY into /usr/share/nginx/html
# would keep nginx's stock 50x.html there, and the runtime stage has no RUN to delete it with.
COPY --from=build /src/dist /srv/www
# nginx-unprivileged runs as uid 101 and listens on 8080. Its pid and temp files live in /tmp, which Kubernetes mounts as an
# emptyDir so the root filesystem can stay read-only.
EXPOSE 8080
USER 101

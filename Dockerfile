# syntax=docker/dockerfile:1.12
#
# The documentation site, as a static image for rillmark.bereket.dev.
#
# The build stage runs on the builder's own platform, because its output (dist/) is plain files that run anywhere. The
# runtime stage is nginx-unprivileged, so the same Dockerfile gives linux/amd64 for the VPS and linux/arm64 for a laptop.
# Both base images are pinned by digest; bump the tag and the digest together.
ARG NODE_IMAGE=node:24.22.2-alpine@sha256:a34ab6d7f6f4813f4d0c5469d74685604b962fbdbf5793a7bc7b4998ecb867c8
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.30.6-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS build
WORKDIR /src
ENV CI=true NPM_CONFIG_UPDATE_NOTIFIER=false NPM_CONFIG_FUND=false
COPY package.json package-lock.json ./
RUN npm ci --no-audit
COPY . .
# npm run build regenerates public/docs, public/source and src/generated before vite build, as it does locally.
RUN npm run build \
 && test -f dist/index.html \
 && test -f dist/llms.txt

FROM ${NGINX_IMAGE} AS runtime
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /src/dist /usr/share/nginx/html
# nginx-unprivileged runs as uid 101 and listens on 8080. Its pid and temp files live in /tmp, which Kubernetes mounts as an
# emptyDir so the root filesystem can stay read-only.
EXPOSE 8080
USER 101

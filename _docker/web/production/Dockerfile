# Use the official Node.js Alpine base image
FROM node:lts-alpine AS base

# PNPM ENVs
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# See: https://github.com/nodejs/corepack/issues/612
ENV COREPACK_INTEGRITY_KEYS=0

# Install necessary packages, including Nginx, Supervisord
RUN apk add --no-cache nginx supervisor

WORKDIR /app

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# deps
# Install deps and build
FROM base AS build

WORKDIR /app

# Copy configuration and source files needed for the build
COPY . .

# Set environment variables for the build
ENV NODE_ENV=production
ENV CI=true

# NOTE: prune is not currently supported recursively.
# https://pnpm.io/cli/prune
# This is here as a reminder for monorepos
RUN corepack enable pnpm && pnpm install --frozen-lockfile && pnpm build && pnpm prune

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# final
#
# Rebuild the source code only when needed
# This may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM base

LABEL io.infonomic.name="Modulus Registry" \
      io.infonomic.version="${VERSION}" \
      io.infonomic.maintainer="Anthony Bouch <anthony@infonomic.io>" \
      io.infonomic.description="Modulus Registry Website and API."

ARG VERSION

RUN set -eux; \
  mkdir -p /app; \
  mkdir -p /var/run/nginx-cache; \
  chown -R nginx:nginx /app;  \
  chown -R nginx:nginx /run; \
  chown -R nginx:nginx /var/lib/nginx; \
  chown -R nginx:nginx /var/log/nginx; \
  chown -R nginx:nginx /var/run/nginx-cache;

COPY _docker/nginx/ /etc/nginx/
COPY _docker/supervisord.conf /etc/supervisord.conf

USER nginx
WORKDIR /app

# prod deps
COPY --from=build --chown=nginx:nginx /app/node_modules /app/node_modules

# build output
COPY --from=build --chown=nginx:nginx /app/.output /app/.output

COPY _docker/start-nginx.sh /app/start-nginx.sh
COPY _docker/start-node.sh /app/start-node.sh

EXPOSE 8000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]


# This method comes from https://turbo.build/docs/guides/tools/docker
# Base build image
FROM node:22-alpine AS base

FROM base AS builder

# Bring in Turborepo remote cache configuration
ARG TURBO_API
ENV TURBO_API=$TURBO_API

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

# The token comes from the GitHub secrets, not args
RUN --mount=type=secret,id=TURBO_TOKEN

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

RUN npm install --global turbo@^2.5.0
COPY . .
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm ci

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN npx turbo build

FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs && adduser --system --uid 1001 expressjs

USER expressjs

COPY --from=installer /app .

CMD ["node", "apps/api/dist/index.js"]
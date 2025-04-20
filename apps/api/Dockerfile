# This method comes from https://turbo.build/docs/guides/tools/docker
# Base build image
FROM node:22.14.0-alpine AS base

FROM base AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.8.1 --activate

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat

COPY . .
RUN pnpm dlx turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.8.1 --activate
RUN apk update && apk add --no-cache libc6-compat

# Bring in Turborepo remote cache configuration.
ARG TURBO_API
ENV TURBO_API=$TURBO_API

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN --mount=type=secret,id=TURBO_TOKEN \
	export TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN) && pnpm dlx turbo build

# Create the release image
FROM base AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 expressjs && adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer /app .
CMD ["node", "apps/api/dist/index.js"]
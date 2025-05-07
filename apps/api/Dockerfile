# This method comes from https://depot.dev/docs/container-builds/how-to-guides/optimal-dockerfiles/node-pnpm-dockerfile
# Dependencies image
FROM node:22.15.0-alpine AS base

# Install pnpm
ARG PNPM_HOME="/pnpm-store"
ENV PNPM_HOME=${PNPM_HOME}

RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=${PNPM_HOME} echo "pnpm store before fetch: $(ls -la ${PNPM_HOME})"
RUN  --mount=type=cache,target=${PNPM_HOME} \
	pnpm config set store-dir ${PNPM_HOME} && \
	pnpm fetch --frozen-lockfile --prefer-offline
RUN --mount=type=cache,target=${PNPM_HOME} echo "pnpm store after fetch: $(ls -la ${PNPM_HOME})"

FROM deps AS prune

WORKDIR /app
COPY . .
RUN pnpx turbo prune api --docker

FROM base AS builder

WORKDIR /app

# Bring in Turborepo remote cache configuration.
ARG TURBO_API
ENV TURBO_API=$TURBO_API

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG PORT=4503
ENV PORT=${PORT}

ARG HEALTH_PORT=4504
ENV HEALTH_PORT=${HEALTH_PORT}

ARG VERSION=dev
ENV VERSION=${VERSION}

# Copy pnpm files and install the packages
COPY --from=prune /app/out/json/ .
RUN --mount=type=cache,target=${PNPM_HOME} echo "pnpm store before install: $(ls -la ${PNPM_HOME})"
RUN --mount=type=cache,target=${PNPM_HOME} \
	pnpm config set store-dir ${PNPM_HOME} && \
	pnpm install --offline --frozen-lockfile

# Build it
COPY --from=prune /app/out/full/ .
RUN --mount=type=secret,id=TURBO_TOKEN \
	export TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN) && pnpx turbo build --filter=api

# Create the release image
FROM base
WORKDIR /app

ENV NODE_ENV=production

# Set up the health check
ARG HEALTH_PORT=4504
ENV HEALTH_PORT=${HEALTH_PORT}

RUN apk --no-cache add curl
HEALTHCHECK --interval=30s --timeout=5s CMD [ "sh", "-c", "curl -f http://localhost:$HEALTH_PORT/health || exit 1" ]

# Don't run as root
RUN addgroup --system --gid 1001 expressjs && adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=builder /app .

CMD ["node", "apps/api/dist/index.js"]
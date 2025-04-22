# This method comes from https://depot.dev/docs/container-builds/how-to-guides/optimal-dockerfiles/node-pnpm-dockerfile
# Dependencies image
FROM node:22.14.0-alpine AS base

FROM base AS deps

RUN corepack enable && corepack prepare pnpm@10.8.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

FROM deps AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.8.1 --activate

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

# Copy source and mount the cached pnpm files
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod
COPY . .

# Build it
RUN --mount=type=secret,id=TURBO_TOKEN \
	export TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN) && pnpx turbo build

# Create the release image
FROM base
WORKDIR /app

# Set up the health check
ARG HEALTH_PORT=4504
ENV HEALTH_PORT=${HEALTH_PORT}

RUN apk --no-cache add curl
HEALTHCHECK --interval=30s --timeout=5s CMD [ "sh", "-c", "curl -f http://localhost:$HEALTH_PORT/health || exit 1" ]

# Don't run as root
RUN addgroup --system --gid 1001 expressjs && adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=build /app .
ENV NODE_ENV production
CMD ["node", "apps/api/dist/index.js"]
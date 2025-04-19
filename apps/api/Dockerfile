# Base build image
FROM node:23-alpine AS builder

WORKDIR /app

# Copy root and workspace package manifests first (better for Docker caching)
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install full monorepo dependencies using npm workspaces
RUN npm ci

# Copy the rest of the monorepo
COPY . .

# Build only the API workspace
RUN npm run --workspace=apps/api build

# Production image
FROM node:23-alpine AS runner

WORKDIR /app

# Copy built output
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Copy only the necessary package.json files to install prod deps
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install only production deps for api workspace
RUN npm ci --omit=dev --workspace=apps/api

CMD ["node", "apps/api/dist/index.js"]
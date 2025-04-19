# Base build image
FROM node:23-alpine AS builder

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install all dependencies using workspace-aware install
RUN npm install --workspaces --legacy-peer-deps

# Build only the API workspace
RUN npm run --workspace=apps/api build

# Production image
FROM node:23-alpine AS runner

WORKDIR /app

# Copy the built app
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./

# Copy only the production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package-lock.json ./package-lock.json

EXPOSE 3001
CMD ["node", "dist/index.js"]

#!/bin/bash

set -euo pipefail

### Node.js setup

. "${NVM_DIR}/nvm.sh" && nvm install

### pnpm setup

export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

grep -qxF 'export PNPM_HOME="$HOME/.local/share/pnpm"' ~/.zshrc || \
  echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.zshrc
grep -qxF 'export PATH="$PNPM_HOME:$PATH"' ~/.zshrc || \
  echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc

pnpm config set store-dir /workspaces/clearancelab/.pnpm-store

COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm add -g turbo
pnpm install

### Database setup

# Initialize the database
export DB_URI="mongodb://db:27017/plan-verifier"

echo "👤 Dropping database, creating user and disabling telemetry..."
mongosh ${DB_URI} ./seed/init.js # Basic user setup and disable telemetry

echo "📦 Importing data..."
mongoimport --uri=${DB_URI} --collection=scenarios --file=./seed/plan-verifier.scenarios.json --jsonArray
mongoimport --uri=${DB_URI} --collection=scenarios --file=./seed/plan-verifier.airportinfo.json --jsonArray

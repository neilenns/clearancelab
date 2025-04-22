#!/bin/bash

set -euo pipefail
# All paths need to be made absolute since it runs in the context of a devcontainer.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

### Node.js setup

. "${NVM_DIR}/nvm.sh" && nvm install && corepack install

### pnpm setup

sudo chown -R node:node ${PNPM_STORE}
export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
pnpm config set store-dir "$PNPM_STORE" # This comes from devcontainer.json, and is mounted as a volume in docker-compose.yaml

grep -qxF 'export PNPM_HOME="$HOME/.local/share/pnpm"' ~/.zshrc || \
  echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.zshrc
grep -qxF 'export PATH="$PNPM_HOME:$PATH"' ~/.zshrc || \
  echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc

pnpm add -g turbo
pnpm install

### Database setup
"${SCRIPT_DIR}/seed/init.sh"

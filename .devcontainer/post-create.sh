#!/bin/bash

set -euo pipefail
# All paths need to be made absolute since it runs in the context of a devcontainer.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

### Node.js setup

. "${NVM_DIR}/nvm.sh" && nvm install

### pnpm setup

export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

grep -qxF 'export PNPM_HOME="$HOME/.local/share/pnpm"' ~/.zshrc || \
  echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.zshrc
grep -qxF 'export PATH="$PNPM_HOME:$PATH"' ~/.zshrc || \
  echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc

pnpm config set store-dir "$PWD/.pnpm-store"

COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm add -g turbo
pnpm install

### Database setup
"${SCRIPT_DIR}/seed/init.sh"

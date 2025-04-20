#!/bin/bash

set -euo pipefail

. "${NVM_DIR}/nvm.sh" && nvm install

export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

grep -qxF 'export PNPM_HOME="$HOME/.local/share/pnpm"' ~/.zshrc || \
  echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.zshrc
grep -qxF 'export PATH="$PNPM_HOME:$PATH"' ~/.zshrc || \
  echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc

pnpm config set store-dir /workspaces/clearancelab/.pnpm-store

COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm add -g turbo
pnpm install

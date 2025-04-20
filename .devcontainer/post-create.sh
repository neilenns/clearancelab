#!/bin/bash

set -euo pipefail

. "${NVM_DIR}/nvm.sh" && nvm install
pnpm config set store-dir ../.pnpm-store
COREPACK_ENABLE_DOWNLOAD_PROMPT=0  pnpm install turbo --global && pnpm install

#!/bin/bash
set -euo pipefail

# Initialize the database

# All paths need to be made absolute since it runs in the context of a devcontainer.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DB_URI="mongodb://db:27017/clearancelab"

echo "👤 Dropping database, creating user and disabling telemetry..."
mongosh ${DB_URI} "${SCRIPT_DIR}/init.js" # Basic user setup and disable telemetry

echo "📦 Importing data..."
mongoimport --uri=${DB_URI} --collection=scenarios --file="${SCRIPT_DIR}/clearancelab.scenarios.json" --jsonArray
mongoimport --uri=${DB_URI} --collection=airportinfo --file="${SCRIPT_DIR}/clearancelab.airportinfo.json" --jsonArray

#!/bin/bash
set -euo pipefail

# Initialize the database

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DB_URI="mongodb://db:27017/clearancelab"

echo "👤 Dropping database, creating user and disabling telemetry..."
mongosh "${DB_URI}" "${SCRIPT_DIR}/init.js" > /dev/null

echo "📦 Importing data..."
mongoimport --uri="${DB_URI}" --collection=scenarios --file="${SCRIPT_DIR}/clearancelab.scenarios.json" --jsonArray > /dev/null
mongoimport --uri="${DB_URI}" --collection=airportinfo --file="${SCRIPT_DIR}/clearancelab.airportinfo.json" --jsonArray > /dev/null
mongoimport --uri="${DB_URI}" --collection=vatsimflightplans --file="${SCRIPT_DIR}/clearancelab.vatsimflightplans.json" --jsonArray > /dev/null
mongoimport --uri="${DB_URI}" --collection=auth0users --file="${SCRIPT_DIR}/clearancelab.auth0users.json" --jsonArray > /dev/null

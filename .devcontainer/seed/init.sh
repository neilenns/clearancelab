#!/bin/bash
set -euo pipefail

# Initialize the database

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DB_URI="mongodb://db:27017/clearancelab"

mongosh "${DB_URI}" "${SCRIPT_DIR}/init.js" > /dev/null

mongoimport --quiet --uri="${DB_URI}" --collection=scenarios --file="${SCRIPT_DIR}/clearancelab.scenarios.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=airportinfo --file="${SCRIPT_DIR}/clearancelab.airportinfo.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=vatsimflightplans --file="${SCRIPT_DIR}/clearancelab.vatsimflightplans.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=auth0users --file="${SCRIPT_DIR}/clearancelab.auth0users.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=metars --file="${SCRIPT_DIR}/clearancelab.metars.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=airlines --file="${SCRIPT_DIR}/clearancelab.airlines.json" --jsonArray
mongoimport --quiet --uri="${DB_URI}" --collection=apikeys --file="${SCRIPT_DIR}/clearancelab.apikeys.json" --jsonArray

# Initialize the database
export DB_URI="mongodb://db:27017/clearancelab"

echo "👤 Dropping database, creating user and disabling telemetry..."
mongosh ${DB_URI} ./seed/init.js # Basic user setup and disable telemetry

echo "📦 Importing data..."
mongoimport --uri=${DB_URI} --collection=scenarios --file=./clearancelab.scenarios.json --jsonArray
mongoimport --uri=${DB_URI} --collection=airportinfo --file=./clearancelab.airportinfo.json --jsonArray

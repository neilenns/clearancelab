db = connect("mongodb://db:27017/plan-verifier");

// Nuke the existing database
db.dropDatabase();

// Set forceDisableTelemetry
db.settings.updateOne(
  { key: "telemetry" },
  { $set: { forceDisableTelemetry: true } },
  { upsert: true }
);

// Create user if not exists
if (!db.getUser("clearancelab")) {
  db.createUser({
    user: "clearancelab",
    pwd: "clearancelab", // Replace with a secure password
    roles: [{ role: "readWrite", db: "plan-verifier" }],
  });
}

import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

// Track if the connection is being established to prevent concurrent connection attempts
let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedConnection) {
    console.log(`Returning cached connection.`);
    return cachedConnection;
  }

  // If a connection is in progress, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI ?? "");
    const connection = await connectionPromise;

    cachedConnection = connection;
    console.log("✅ Connected to MongoDB");
    connectionPromise = null;

    return cachedConnection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    connectionPromise = null;
    throw err;
  }
}

export function deleteModelIfDev(modelName: string) {
  if (process.env.NODE_ENV === "development") {
    try {
      mongoose.deleteModel(modelName);
    } catch {
      // no-op
    }
  }
}

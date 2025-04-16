import mongoose from "mongoose";
import Env from "./env";

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(Env.MONGODB_URI);
    cachedConnection = connection;
    console.log("✅ Connected to MongoDB");
    return connection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

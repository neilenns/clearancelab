import { ENV } from "@lib/environment.js";
import { logger } from "@lib/logger.js";
import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const maskedConnectionString = ENV.MONGO_DB_CONNECTION_STRING.replace(
    /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
    "mongodb$1://$2:****@",
  );
  logger.info(
    `Connecting to ${ENV.MONGO_DB_NAME} at ${maskedConnectionString}`,
  );

  mongoose.set("debug", function (collectionName, method, query, _document) {
    logger.debug(`[${collectionName}.${method}] ${JSON.stringify(query)}`);
  });

  await mongoose.connect(ENV.MONGO_DB_CONNECTION_STRING, {
    dbName: ENV.MONGO_DB_NAME,
  });

  logger.info("✅ Connected to MongoDB");
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    await mongoose.connection.close(false);
    logger.info("MongoDB connection closed");
  } catch (error: unknown) {
    logger.error(
      `Error closing MongoDB connection: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

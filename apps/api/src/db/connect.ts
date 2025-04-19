import mongoose from "mongoose";
import { ENV } from "../lib/env.js";
import { logger } from "../lib/logger.js";

export async function connectToDatabase(): Promise<void> {
  const maskedConnectionString = ENV.MONGO_DB_CONNECTION_STRING.replace(
    /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
    "mongodb$1://$2:****@"
  );
  logger.info(
    `Connecting to ${ENV.MONGO_DB_NAME} at ${maskedConnectionString}`
  );

  mongoose.set("debug", function (collectionName, method, query, _doc) {
    logger.debug(`[${collectionName}.${method}] ${JSON.stringify(query)}`);
  });

  await mongoose.connect(ENV.MONGO_DB_CONNECTION_STRING, {
    dbName: ENV.MONGO_DB_NAME,
  });

  logger.info("✅ Connected to MongoDB");
}

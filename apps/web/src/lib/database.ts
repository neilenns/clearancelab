import { ENV } from "@/lib/environment";
import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  console.log(`Connecting to MongoDB at ${ENV.MONGODB_URI}...`);
  console.log(`Database: ${ENV.MONGODB_DATABASE}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mongoose.set("debug", (collectionName, method, query, _document) => {
    console.debug(`[${collectionName}.${method}] ${JSON.stringify(query)}`);
  });
  await mongoose.connect(ENV.MONGODB_URI, {
    dbName: ENV.MONGODB_DATABASE,
  });
}

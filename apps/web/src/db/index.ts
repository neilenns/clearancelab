import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

export const getDatabase = cache(() => {
  const { env } = getCloudflareContext();
  if (Object.keys(env).length === 0) {
    throw new Error("Environment variables are missing or empty.");
  }
  return drizzle(env.ACCESS_CODES_DB, { schema });
});

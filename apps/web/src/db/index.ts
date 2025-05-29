import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

// Converts nulls to undefined in results from the database so the results play nicely
// with all the UI components that expect undefined.
export function nullsToUndefined<T extends object>(
  row: T,
): {
  [K in keyof T]: T[K] extends null ? undefined : T[K];
} {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, v === null ? undefined : v]),
  ) as never;
}

export type ReplaceNullWithUndefined<T> = {
  [K in keyof T]: null extends T[K] ? Exclude<T[K], null> | undefined : T[K];
};

export const getDatabase = cache(() => {
  const { env } = getCloudflareContext();
  if (Object.keys(env).length === 0) {
    throw new Error("Environment variables are missing or empty.");
  }
  return drizzle(env.CLEARANCELAB_DB, { schema });
});

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDatabaseAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });

  if (Object.keys(env).length === 0) {
    throw new Error("Unable to obtain a Cloudflare context.");
  }

  return drizzle(env.CLEARANCELAB_DB, { schema });
});

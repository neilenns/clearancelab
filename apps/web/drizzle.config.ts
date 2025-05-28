import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/lib/environment";

export default ENV.LOCAL_DB_PATH
  ? defineConfig({
      schema: "./src/db/schema/index.ts",
      dialect: "sqlite",
      out: "./drizzle/migrations",
      dbCredentials: {
        url: `./${ENV.LOCAL_DB_PATH}`,
      },
    })
  : defineConfig({
      schema: "./src/db/schema/index.ts",
      dialect: "sqlite",
      out: "./drizzle/migrations",
      driver: "d1-http",
      dbCredentials: {
        accountId: ENV.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: ENV.CLOUDFLARE_DATABASE_ID!,
        token: ENV.CLOUDFLARE_D1_TOKEN!,
      },
    });

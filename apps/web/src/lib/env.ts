import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_BASE_URL: z
    .string()
    .url({
      message: "API_BASE_URL must be a valid URL.",
    })
    .transform((val) => val.replace(/\/+$/, "")),
  API_KEY: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) {
        console.warn("Warning: API_KEY is not set.");
      }
      return val;
    }),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_DOMAIN: z
    .string()
    .url({ message: "AUTH0_DOMAIN must be a valid URL." }),
  AUTH0_SCOPE: z.string(),
  AUTH0_SECRET: z.string(),
  APP_BASE_URL: z
    .string()
    .url({ message: "APP_BASE_URL must be a valid URL." }),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("Environment validation failed:", result.error.format());
  process.exit(1);
}

export const ENV = result.data;

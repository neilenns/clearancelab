import { auth0url } from "@workspace/validators";
import { z } from "zod";

const environmentSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    API_BASE_URL: z
      .string()
      .url({
        message: "API_BASE_URL must be a valid URL.",
      })
      .transform((value) => value.replace(/\/+$/, "")),
    API_KEY: z
      .string()
      .optional()
      .transform((value) => {
        if (!value) {
          console.warn("Warning: API_KEY is not set.");
        }
        return value;
      }),
    AUDIO_BASE_URL: z.string().url(),
    AUTH0_AUDIENCE: auth0url.optional(), // Optional, but should be a valid URL
    AUTH0_CLIENT_SECRET: z.string().optional(),
    AUTH0_CLIENT_ID: z.string().optional(),
    AUTH0_DOMAIN: auth0url.optional(), // Optional, but should be a valid URL
    AUTH0_SECRET: z.string().optional(),
    APP_BASE_URL: z.string().url().optional(), // Optional, but should be a valid URL
    BACKEND_CF_ACCESS_CLIENT_ID: z.string().optional(),
    BACKEND_CF_ACCESS_CLIENT_SECRET: z.string().optional(),
    CLOUDFLARE_RUNTIME_API_TOKEN: z.string().optional(), // API token with Zone: Cache Purge permission
    CLOUDFLARE_ZONE_ID: z.string().optional(), // Domain name the worker is hosted on, used for clearing cache files.
    DISABLE_AUTH: z
      .preprocess((value) => value === "true" || value === "1", z.boolean())
      .default(false),
    SAMPLE_SCENARIO_ID: z
      .string()
      .optional()
      .default("6802cef1cd28e1a43a89e8d9"), // ASA1160
  })
  .superRefine((environment, context) => {
    if (environment.DISABLE_AUTH && environment.NODE_ENV === "production") {
      context.addIssue({
        path: ["DISABLE_AUTH"],
        code: z.ZodIssueCode.custom,
        message: "DISABLE_AUTH cannot be true in production environment",
      });
    }

    if (!environment.DISABLE_AUTH) {
      for (const key of [
        "AUTH0_DOMAIN",
        "AUTH0_AUDIENCE",
        "AUTH0_CLIENT_ID",
        "AUTH0_CLIENT_SECRET",
        "AUTH0_SECRET",
      ] as const) {
        if (!environment[key]) {
          context.addIssue({
            path: [key],
            code: z.ZodIssueCode.custom,
            message: `${key} is required when DISABLE_AUTH is false`,
          });
        }
      }
    }
  });

const result = environmentSchema.safeParse(process.env);
if (!result.success) {
  console.error("Environment validation failed:", result.error.format());
  throw new Error(
    "Environment validation failed. Please check your environment variables.",
  );
}

export const ENV = {
  ...result.data,
  AUTH_DISABLED:
    result.data.DISABLE_AUTH && result.data.NODE_ENV === "development",
};

import { z } from "zod";

// Normalizes inputs to be an URL that work with Auth0 since they are so wildly
// inconsistent with their URL requirements.
export const auth0url = z
  .string()
  .trim()
  .transform((value) => {
    let url = value;
    if (!/^https:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    // So picky, but Auth0 requires a trailing slash on the URL.
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  })
  .refine(
    (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL",
    },
  );

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
    AUTH0_AUDIENCE: auth0url.optional(), // Optional, but should be a valid URL
    AUTH0_CLIENT_SECRET: z.string().optional(),
    AUTH0_CLIENT_ID: z.string().optional(),
    AUTH0_DOMAIN: auth0url.optional(), // Optional, but should be a valid URL
    AUTH0_SECRET: z.string().optional(),
    APP_BASE_URL: z.string().url().optional(), // Optional, but should be a valid URL
    BACKEND_CF_ACCESS_CLIENT_ID: z.string().optional(),
    BACKEND_CF_ACCESS_CLIENT_SECRET: z.string().optional(),
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    CLOUDFLARE_DATABASE_ID: z.string().optional(),
    CLOUDFLARE_D1_TOKEN: z.string().optional(),
    DISABLE_AUTH: z
      .preprocess((value) => value === "true" || value === "1", z.boolean())
      .default(false),
    LOCAL_DB_PATH: z.string().optional(),
  })
  .superRefine((environment, context) => {
    if (environment.LOCAL_DB_PATH) {
      // If LOCAL_DB_PATH is set, nothing else matters
      return;
    }

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

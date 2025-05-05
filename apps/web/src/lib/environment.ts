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
    AUTH0_AUDIENCE: z
      .string()
      .url({ message: "AUTH0_AUDIENCE must be a valid URL." })
      .optional(),
    AUTH0_CLIENT_SECRET: z.string().optional(), // To generate this use `openssl rand -hex 32`
    AUTH0_CLIENT_ID: z.string().optional(),
    AUTH0_DOMAIN: z
      .string()
      .url({ message: "AUTH0_DOMAIN must be a valid URL." })
      .optional(),
    AUTH0_SECRET: z.string().optional(),
    APP_BASE_URL: z
      .string()
      .url({ message: "APP_BASE_URL must be a valid URL." }),
    DISABLE_AUTH: z
      .preprocess((value) => value === "true" || value === "1", z.boolean())
      .default(false),
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

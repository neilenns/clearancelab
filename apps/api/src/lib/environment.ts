import { config } from "@dotenvx/dotenvx";
import { auth0url } from "@workspace/validators";
import z from "zod";

config({
  ignore: ["MISSING_ENV_FILE"],
});

const environmentSchema = z
  .object({
    API_RATE_LIMIT_MAX: z.coerce.number().default(120),
    API_RATE_LIMIT_MINUTE_WINDOW: z.coerce.number().default(1),
    AUTH0_AUDIENCE: auth0url.optional(), // Optional, but should be a valid URL
    AUTH0_DOMAIN: auth0url.optional(), // Optional, but should be a valid URL
    DISABLE_AUTH: z
      .preprocess((value) => value === "true" || value === "1", z.boolean())
      .default(false),
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
    MONGO_DB_CONNECTION_STRING: z
      .string()
      .url({ message: "Invalid MongoDB connection string format" }),
    MONGO_DB_NAME: z.string().default("plan-verifier"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(4503),
    HEALTH_PORT: z.coerce.number().default(4504),
    SSL_PRIVATE_KEY_PATH: z.string().default(""),
    SSL_FULL_CHAIN_PATH: z.string().default(""),
    TRUST_PROXY: z.coerce.number().default(0),
    VERSION: z.string().default("dev"),
    WHITELISTED_DOMAINS: z.string().default("http://localhost:*"),
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
      for (const key of ["AUTH0_DOMAIN", "AUTH0_AUDIENCE"] as const) {
        // eslint-disable-next-line security/detect-object-injection
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
  // Can't use logger.js here because it depends on ENV.
  console.error("Environment validation failed:", result.error.format());
  throw new Error("Environment validation failed");
}

export const ENV = result.data;

import { config } from "@dotenvx/dotenvx";
import z from "zod";

config({
  ignore: ["MISSING_ENV_FILE"],
});

const environmentSchema = z
  .object({
    API_RATE_LIMIT_MAX: z.coerce.number().default(100),
    API_RATE_LIMIT_MINUTE_WINDOW: z.coerce.number().default(5),
    AUTH0_AUDIENCE: z.string().optional(),
    AUTH0_DOMAIN: z
      .string()
      .url({ message: "AUTH0_DOMAIN must be a valid URL." })
      .optional(),
    DISABLE_AUTH: z.coerce.boolean().default(false),
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
      if (!environment.AUTH0_DOMAIN) {
        context.addIssue({
          path: ["AUTH0_DOMAIN"],
          code: z.ZodIssueCode.custom,
          message: "AUTH0_DOMAIN is required when DISABLE_AUTH is false",
        });
      }
      if (!environment.AUTH0_AUDIENCE) {
        context.addIssue({
          path: ["AUTH0_AUDIENCE"],
          code: z.ZodIssueCode.custom,
          message: "AUTH0_AUDIENCE is required when DISABLE_AUTH is false",
        });
      }
    }
  });

const result = environmentSchema.safeParse(process.env);
if (!result.success) {
  console.error("Environment validation failed:", result.error.format());
  throw new Error("Environment validation failed");
}

export const ENV = result.data;

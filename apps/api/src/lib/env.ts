import z from "zod";

const envSchema = z.object({
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
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("Environment validation failed:", result.error.format());
  process.exit(1);
}

export const ENV = result.data;

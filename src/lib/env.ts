import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  MONGODB_URI: z
    .string()
    .url({
      message:
        "A valid MongoDB connection string is required. Check your .env file.",
    }),
});

const Env = envSchema.parse(process.env);
export default Env;

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
  API_KEY: z.string().min(1, { message: "API_KEY is required" }),
});

const Env = envSchema.parse(process.env);
export default Env;

import rateLimit from "express-rate-limit";
import { ENV } from "../lib/environment.js";

export const rateLimiter = rateLimit({
  windowMs: ENV.API_RATE_LIMIT_MINUTE_WINDOW * 60 * 1000, // 5 minute default
  max: ENV.API_RATE_LIMIT_MAX, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

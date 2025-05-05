import { logger } from "@lib/logger.js";
import expressWinston from "express-winston";

// Request logger middleware
export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  msg: "{{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
});

import { type NextFunction, type Request, type Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../lib/environment.js";
import { logger } from "../lib/logger.js";

const log = logger.child({ service: "permissions" });

export const verifyUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const middleware = auth({
    audience: ENV.AUTH0_AUDIENCE,
    issuerBaseURL: ENV.AUTH0_DOMAIN,
  });

  try {
    // Disable auth in development mode
    if (ENV.DISABLE_AUTH && ENV.NODE_ENV === "development") {
      log.warn("DISABLE_AUTH is true, authentication is disabled.");
      next();
      return;
    }

    await middleware(request, response, (error?: unknown) => {
      if (error) {
        log.debug("Authorization error", error);
        if (
          typeof error === "object" &&
          "name" in error &&
          (error as { name: string }).name === "UnauthorizedError"
        ) {
          response.status(401).json({ error: "Invalid or missing token" });
          return;
        }
        response.status(500).json({ error: "Authorization failure" });
        return;
      }
      next();
    });
  } catch (error) {
    log.error("Authorization middleware failed", error);
    response.status(500).json({ error: "Authorization failure" });
    return;
  }
};

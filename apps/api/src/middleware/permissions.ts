import { ENV } from "@lib/environment.js";
import { logger } from "@lib/logger.js";
import { type NextFunction, type Request, type Response } from "express";
import { auth, claimCheck } from "express-oauth2-jwt-bearer";

const log = logger.child({ service: "permissions" });

export enum Permissions {
  DeleteScenarios = "delete:scenarios",
  AddScenarios = "add:scenarios",
  ViewLab = "view:lab",
  ViewAdmin = "view:admin",
}

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
  if (ENV.DISABLE_AUTH && ENV.NODE_ENV === "development") {
    log.warn(
      "DISABLE_AUTH is true, skipping permission check for development.",
    );
    return (request: Request, response: Response, next: NextFunction) => {
      next();
    };
  }

  // Directly return the middleware created by claimCheck
  return claimCheck((payload) => {
    const permissions = (payload.permissions ?? []) as string[];

    const hasPermissions = requiredPermissions.every((requiredPermission) =>
      permissions.includes(requiredPermission),
    );

    if (!hasPermissions) {
      +response
        .status(403)
        .json({ error: "Forbidden – insufficient permissions" });
    }

    return hasPermissions;
  });
};

export const verifyUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (ENV.DISABLE_AUTH && ENV.NODE_ENV === "development") {
    log.warn("DISABLE_AUTH is true, authentication is disabled.");
    next();
    return;
  }

  const middleware = auth({
    audience: ENV.AUTH0_AUDIENCE,
    // AUTH0_DOMAIN is always defined and a string, as enforced by Zod if DISABLE_AUTH is false.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    issuerBaseURL: `https://${ENV.AUTH0_DOMAIN}`,
  });

  try {
    // Disable auth in development mode
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

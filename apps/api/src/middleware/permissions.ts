import { type NextFunction, type Request, type Response } from "express";
import { type AuthResult, auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../lib/env.js";
import { logger } from "../lib/logger.js";

const log = logger.child({ service: "permissions" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
  userId: string;
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const middleware = auth({
    audience: ENV.AUTH0_AUDIENCE,
    issuerBaseURL: ENV.AUTH0_DOMAIN,
  });

  try {
    await middleware(req, res, (err?: unknown) => {
      if (err) {
        if (typeof err === "object" && "name" in err) {
          if ((err as { name: string }).name === "UnauthorizedError") {
            return res.status(401).json({ error: "Invalid or missing token" });
          }
        }
        return res.status(500).json({ error: "Auth failure", details: err });
      }
      next();
    });
  } catch (err) {
    log.error("Authorization middleware failed", err);
    return res.status(500).json({ error: "Authorization failure" });
  }
};

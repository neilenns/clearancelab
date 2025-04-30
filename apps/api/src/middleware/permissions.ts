import { type NextFunction, type Request, type Response } from "express";
import { type AuthResult, auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../lib/env.js";
import { Auth0UserModel, Auth0User } from "../models/auth0-user.js";
import { logger } from "../lib/logger.js";

const log = logger.child({ service: "permissions" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
  userId: string;
}

interface VerifyErrorResponse {
  error: {
    isPending: boolean;
    message: string;
  };
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

export const verifyAndAddUserInfo = async (
  req: Auth0UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Call your existing authentication middleware
  await auth({
    audience: ENV.AUTH0_AUDIENCE,
    issuerBaseURL: ENV.AUTH0_DOMAIN,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
  })(req, res, async (err: unknown) => {
    if (err != null) {
      const error = err as Error;

      log.error(`Unable to authenticate user: ${error.message}`, error);
      next(err);
      return;
    }

    try {
      const sub = req.auth?.payload.sub;

      if (req.auth == null) {
        log.error(`No authentication found. This should never happen.`);
        return res.status(404).json({
          error: { isPending: false, message: "User not found" },
        } satisfies VerifyErrorResponse);
      }

      if (sub == null) {
        log.error(`No sub found for ${JSON.stringify(req.auth)}`);
        return res.status(401).json({
          error: { isPending: false, message: "Unauthorized" },
        } satisfies VerifyErrorResponse);
      }

      // Look up the user in the database so the _id can be stored and
      // used by all the rest of the service.
      const user = await Auth0UserModel.findOne({ sub });

      if (user == null) {
        log.error(`No user found for ${sub}`);
        return res.status(404).json({ message: "User not found" });
      }

      // Store the user ID in the request so it can be used elsewhere.
      req.userId = user._id as string;

      next();
    } catch (err) {
      const error = err as Error;

      log.error(`Error retrieving user information: ${error.message}`, error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const dumpJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  log.debug(req.headers.authorization);
  next();
};

export const verifyRole =
  (role: string) =>
  async (req: Auth0UserRequest, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;

    if (sub == null) {
      log.error(`No sub found for ${JSON.stringify(req.auth)}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    let userInfo: Auth0User | null;

    try {
      userInfo = await Auth0UserModel.findOrCreate(sub);
    } catch (err) {
      log.error(`Unable to get user data from database`, err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (userInfo == null) {
      log.error(`No user found for ${sub}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    // Pending users get a special 403 message
    if (userInfo.isPending) {
      log.warn(`User ${sub} (${userInfo._id as string}) is pending approval`);
      return res.status(403).json({
        error: { isPending: true, message: "Account not verified" },
      } satisfies VerifyErrorResponse);
    }
    // If the role doesn't match they also get a 403 message
    else if (!userInfo.roles.includes(role)) {
      log.error(
        `User ${sub} (${userInfo._id as string}) has ${userInfo.roles.join(
          ", "
        )} roles but not the requested role ${role}`
      );
      return res.status(403).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    // User and role is validated so allow the next middleware to execute
    next();
  };

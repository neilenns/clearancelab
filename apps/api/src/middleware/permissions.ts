import { type NextFunction, type Request, type Response } from "express";
import { type AuthResult, auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../lib/env.js";
import { logger } from "../lib/logger.js";
import { Auth0UserModel } from "../models/auth0-user.js";

const log = logger.child({ service: "permissions" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
}

interface VerifyErrorResponse {
  error: {
    isPending: boolean;
    message: string;
  };
}

export const verifyUser = auth({
  audience: "https://planverifier.badcasserole.com:4001/",
  issuerBaseURL: ENV.AUTH0_DOMAIN,
});

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

      // Kind of a hack, just blindly replace the Auth0 sub (which isn't useful elsewhere)
      // with the _id of the user in the database (which is useful).
      req.auth.payload.sub = user._id as string;

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
  logger.debug(req.headers.authorization);
  next();
};

export const verifyRole =
  (role: string) =>
  async (req: Auth0UserRequest, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;

    if (sub == null) {
      logger.error(`No sub found for ${JSON.stringify(req.auth)}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    const userInfo = await Auth0UserModel.findOrCreate(sub);

    if (userInfo == null) {
      logger.error(`No user found for ${sub}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    // Pending users get a special 403 message
    if (userInfo.isPending) {
      logger.warn(
        `User ${sub} (${userInfo._id as string}) is pending approval`
      );
      return res.status(403).json({
        error: { isPending: true, message: "Account not verified" },
      } satisfies VerifyErrorResponse);
    }
    // If the role doesn't match they also get a 403 message
    else if (!userInfo.roles.includes(role)) {
      logger.error(
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

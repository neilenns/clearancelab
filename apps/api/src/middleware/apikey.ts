import { ENV } from "@lib/environment.js";
import { logger } from "@lib/logger.js";
import { ApiKeyModel } from "@models/api-key.js";
import { type NextFunction, type Request, type Response } from "express";

const log = logger.child({ service: "apikey" });

// Verifies that a valid api key was provided in the web request.
export const verifyApiKey = async function (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Don't validate API keys in development
    if (ENV.NODE_ENV === "development") {
      next();
      return;
    }

    // Get the API key from the request headers
    const apiKey = request.headers["x-api-key"] ?? request.query["x-api-key"];

    if (typeof apiKey !== "string") {
      response
        .status(401)
        .json({ error: "Unauthorized - Invalid API key format" });
      return;
    }

    const apiKeyDocument = await ApiKeyModel.findOne({
      _id: apiKey,
      isActive: true,
    });

    if (!apiKeyDocument) {
      log.error(
        `Invalid API key attempt: ${apiKey.slice(0, 3)}...${apiKey.slice(-3)}`,
      );
      response.status(401).json({ error: "Unauthorized - Invalid API key" });
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
};

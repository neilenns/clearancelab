import { type NextFunction, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { ENV } from "../lib/environment.js";
import { ApiKeyModel } from "../models/api-key.js";

const apiKeyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many attempts, please try again later" },
});

// Verifies that a valid api key was provided in the web request.
export const verifyApiKeyRaw = async function (
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
      response.status(401).json({ error: "Unauthorized - Invalid API key format" });
      return;
    }

    const apiKeyDocument = await ApiKeyModel.findOne({
      _id: apiKey,
      isActive: true,
    });

    if (!apiKeyDocument) {
      console.error(`Invalid API key attempt: ${apiKey.slice(0, 3)}...${apiKey.slice(-3)}`);
      response.status(401).json({ error: "Unauthorized - Invalid API key" });
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
};

export const verifyApiKey = [apiKeyLimiter, verifyApiKeyRaw];

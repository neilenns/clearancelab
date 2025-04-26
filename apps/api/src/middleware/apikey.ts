import { type NextFunction, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { ApiKeyModel } from "../models/apiKey.js";
import { ENV } from "../lib/env.js";

const apiKeyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many attempts, please try again later" },
});

// Verifies that a valid api key was provided in the web request.
export const verifyApiKeyRaw = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Don't validate API keys in development
    if (ENV.NODE_ENV === "development") {
      next();
      return;
    }

    // Get the API key from the request headers
    const apiKey = req.headers["x-api-key"] ?? req.query["x-api-key"];

    if (typeof apiKey !== "string") {
      res.status(401).json({ error: "Unauthorized - Invalid API key format" });
      return;
    }

    const apiKeyDoc = await ApiKeyModel.findOne({
      _id: apiKey,
      isActive: true,
    });

    if (apiKeyDoc == null) {
      console.error(
        `Invalid API key attempt: ${apiKey.slice(0, 3)}...${apiKey.slice(-3)}`
      );
      res.status(401).json({ error: "Unauthorized - Invalid API key" });
      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  next();
};

export const verifyApiKey = [apiKeyLimiter, verifyApiKeyRaw];

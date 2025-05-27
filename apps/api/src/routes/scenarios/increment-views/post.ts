import { verifyApiKey } from "@/middleware/apikey.js";
import { logger } from "@lib/logger.js";
import { ScenarioModel } from "@models/scenario.js";
import { Request, Response, Router } from "express";

const log = logger.child({ service: "scenarios" });

const router = Router();

interface IncrementViewsRequest {
  id: string;
}

router.post(
  "/",
  verifyApiKey,
  async (
    request: Request<unknown, unknown, IncrementViewsRequest>,
    response: Response,
  ) => {
    const { id } = request.body;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Scenario ID is required.",
      });
      return;
    }

    try {
      await ScenarioModel.incrementViews(id);

      response.status(200).json({
        success: true,
      });
    } catch (error) {
      log.error("Error incrementing scenario views:", error);

      response.status(500).json({
        success: false,
        message: "Error incrementing scenario views",
      });
    }
  },
);

export default router;

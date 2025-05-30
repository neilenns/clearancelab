import { logger } from "@lib/logger.js";
import {
  checkRequiredPermissions,
  verifyUser,
} from "@middleware/permissions.js";
import { ScenarioModel } from "@models/scenario.js";
import {
  AddOrUpdateScenarioResponse,
  Permissions,
  Scenario,
  scenarioSchema,
} from "@workspace/validators";
import { Request, Response, Router } from "express";

const log = logger.child({ service: "scenarios" });

const router = Router();

router.post(
  "/",
  verifyUser,
  checkRequiredPermissions(Permissions.AddScenarios),
  async (request: Request<unknown, unknown, Scenario>, response: Response) => {
    const result = scenarioSchema.safeParse(request.body);

    if (!result.success) {
      const postResponse: AddOrUpdateScenarioResponse = {
        success: false,
        message: `Invalid scenario data: ${JSON.stringify(result.error.format())}.`,
      };

      response.status(400).json(postResponse);
      return;
    }

    try {
      const newScenario = new ScenarioModel(result.data);
      const savedScenario = await newScenario.save();

      const postResponse: AddOrUpdateScenarioResponse = {
        success: true,
        data: {
          ...savedScenario.toObject(),
          _id: savedScenario._id.toString(),
        },
      };

      response.status(201).json(postResponse);
    } catch (error) {
      log.error("Error creating scenario:", error);

      const postResponse: AddOrUpdateScenarioResponse = {
        success: false,
        message: "Error creating scenario",
      };

      response.status(500).json(postResponse);
    }
  },
);

export default router;

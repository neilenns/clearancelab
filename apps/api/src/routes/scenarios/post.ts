import {
  AddOrUpdateScenarioResponse,
  Scenario,
  scenarioSchema,
} from "@workspace/validators";
import { Request, Response, Router } from "express";
import { verifyUser } from "../../middleware/permissions.js";
import { ScenarioModel } from "../../models/scenario.js";

const router = Router();

router.post(
  "/",
  verifyUser,
  async (request: Request<unknown, unknown, Scenario>, response: Response) => {
    const result = scenarioSchema.safeParse(request.body);

    if (!result.success) {
      const postResponse: AddOrUpdateScenarioResponse = {
        success: false,
        message: "Invalid scenario data",
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
      return;
    } catch (error) {
      console.error("Error creating scenario:", error);

      const postResponse: AddOrUpdateScenarioResponse = {
        success: false,
      };

      response.status(500).json(postResponse);
      return;
    }
  },
);

export default router;

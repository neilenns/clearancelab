import {
  AddOrUpdateScenarioResponse,
  scenarioSchema,
} from "@workspace/validators";
import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { logger } from "../../lib/logger.js";
import { verifyUser } from "../../middleware/permissions.js";
import { ScenarioModel } from "../../models/scenario.js";

const log = logger.child({ service: "scenarios" });

const router = Router();

router.put("/:id", verifyUser, async (request: Request, response: Response) => {
  const { id } = request.params;
  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    const putResponse: AddOrUpdateScenarioResponse = {
      success: false,
      message: `Invalid scenario ID ${id}.`,
    };

    response.status(404).json(putResponse);
    return;
  }

  const result = scenarioSchema.safeParse(request.body);

  if (!result.success) {
    const details = result.error.format();
    const putResponse: AddOrUpdateScenarioResponse = {
      success: false,
      message: `Invalid scenario data: ${JSON.stringify(details)}.`,
    };

    response.status(400).json(putResponse);
    return;
  }

  try {
    const updatedScenario = await ScenarioModel.findByIdAndUpdate(
      id,
      result.data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedScenario) {
      const putResponse: AddOrUpdateScenarioResponse = {
        success: false,
        message: `Scenario with ID ${id} not found.`,
      };

      response.status(404).json(putResponse);
      return;
    }

    const putResponse: AddOrUpdateScenarioResponse = {
      success: true,
      data: {
        ...updatedScenario.toObject(),
        _id: updatedScenario._id.toString(),
      },
    };

    response.json(putResponse);
  } catch (error) {
    log.error("Error updating scenario:", error);

    const scenariosResponse: AddOrUpdateScenarioResponse = {
      success: false,
      message: "Error updating scenario",
    };

    response.status(500).json(scenariosResponse);
  }
});

export default router;

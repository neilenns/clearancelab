import {
  AddOrUpdateScenarioResponse,
  scenarioSchema,
} from "@workspace/validators";
import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyUser } from "../../middleware/permissions.js";
import { ScenarioModel } from "../../models/scenario.js";

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
    console.error("Error updating scenario:", error);

    const scenariosResponse: AddOrUpdateScenarioResponse = {
      success: false,
    };

    response.status(500).json(scenariosResponse);
    return;
  }
});

export default router;

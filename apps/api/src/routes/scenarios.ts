import {
  AddOrUpdateScenarioResponse,
  DeleteScenarioResponse,
  Scenario,
  ScenarioResponse,
  scenarioSchema,
  ScenarioSummaryResponse,
} from "@workspace/validators";
import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyApiKey } from "../middleware/apikey.js";
import { verifyUser } from "../middleware/permissions.js";
import { ScenarioModel } from "../models/scenario.js";

const router = Router();

type SummaryRequest = Request<
  unknown,
  unknown,
  unknown,
  { id?: string | string[] }
>;

router.get(
  "/",
  verifyApiKey,
  async (request: SummaryRequest, response: Response) => {
    try {
      const ids = request.query.id;
      const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];

      const scenarios = await ScenarioModel.findScenarios(idList);

      const scenarioResponse: ScenarioResponse = {
        success: true,
        data: scenarios.map((scenario) => ({
          ...scenario,
          _id: scenario._id.toString(),
        })),
      };

      response.json(scenarioResponse);

      return;
    } catch (error) {
      console.error("Error fetching scenarios:", error);

      const scenariosResponse: ScenarioResponse = {
        success: false,
      };

      response.status(500).json(scenariosResponse);
      return;
    }
  },
);

router.get(
  "/summary",
  verifyApiKey,
  async (request: SummaryRequest, response: Response) => {
    try {
      const ids = request.query.id;
      const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];

      const scenarios = await ScenarioModel.findSummary(idList);

      const scenarioResponse: ScenarioSummaryResponse = {
        success: true,
        data: scenarios.map((scenario) => ({
          ...scenario,
          _id: scenario._id.toString(),
        })),
      };

      response.json(scenarioResponse);

      return;
    } catch (error) {
      console.error("Error fetching scenarios:", error);

      const scenariosResponse: ScenarioResponse = {
        success: false,
      };

      response.status(500).json(scenariosResponse);
      return;
    }
  },
);

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

router.delete(
  "/:id",
  verifyUser,
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: `Invalid scenario ID ${id}.`,
      };

      console.error(`Invalid scenario ID ${id}`);
      response.status(404).json(deleteResponse);
      return;
    }

    try {
      const deletedScenario = await ScenarioModel.findByIdAndDelete(id);

      if (!deletedScenario) {
        const deleteResponse: DeleteScenarioResponse = {
          success: false,
          message: `Scenario with ID ${id} not found.`,
        };

        console.error(`Scenario with ID ${id} not found, couldn't delete it.`);
        response.status(404).json(deleteResponse);
        return;
      }

      const deleteResponse: DeleteScenarioResponse = {
        success: true,
      };

      response.status(204).json(deleteResponse);
    } catch (error) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: "An error occurred while trying to delete the scenario.",
      };

      console.error("Error deleting scenario:", error);
      response.status(500).json(deleteResponse);
      return;
    }
  },
);

export default router;

import {
  Scenario,
  ScenarioErrorResponse,
  ScenarioListResponse,
  scenarioSchema,
  ScenarioSummaryListResponse,
} from "@workspace/validators";
import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyApiKey } from "../middleware/apikey.js";
import { verifyUser } from "../middleware/permissions.js";
import { ScenarioModel } from "../models/scenario.js";

const router = Router();

router.get("/", verifyApiKey, async (request: Request, response: Response) => {
  try {
    const scenarios = await ScenarioModel.findAll();

    const scenarioResponse: ScenarioListResponse = {
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

    const scenariosResponse: ScenarioErrorResponse = {
      success: false,
    };

    response.json(scenariosResponse);
    return;
  }
});

router.get(
  "/summary",
  verifyApiKey,
  async (request: Request, response: Response) => {
    try {
      const scenarios = await ScenarioModel.findSummary();

      const scenarioResponse: ScenarioSummaryListResponse = {
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

      const scenariosResponse: ScenarioErrorResponse = {
        success: false,
      };

      response.json(scenariosResponse);
      return;
    }
  },
);

// Add a route to look up a scenario by ID
router.get(
  "/:id",
  verifyApiKey,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const isValid = mongoose.isValidObjectId(id);

      if (!isValid) {
        response
          .status(404)
          .json({ error: `${id} is not a valid scenario ID.` });
        return;
      }

      const scenario = await ScenarioModel.findScenarioById(id);

      if (!scenario) {
        response.status(404).json({ error: "Scenario not found" });
        return;
      }

      response.json(scenario);
    } catch (error) {
      next(error); // Pass to centralized error handler
    }
  },
);

router.post(
  "/",
  verifyUser,
  async (
    request: Request<unknown, unknown, Scenario>,
    response: Response,
    next: NextFunction,
  ) => {
    const result = scenarioSchema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({
        error: "Invalid scenario data",
        details: result.error.format(),
      });

      return;
    }

    try {
      const newScenario = new ScenarioModel(result.data);
      const saved = await newScenario.save();

      response.status(201).json(saved);

      return;
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  verifyUser,
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      response.status(404).json({ error: `${id} is not a valid scenario ID.` });
      return;
    }

    const result = scenarioSchema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({
        error: "Invalid scenario data",
        details: result.error.format(),
      });
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
        response.status(404).json({ error: "Scenario not found" });
        return;
      }

      response.json(updatedScenario);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  verifyUser,
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      response.status(404).json({ error: `${id} is not a valid scenario ID.` });
      return;
    }

    try {
      const deletedScenario = await ScenarioModel.findByIdAndDelete(id);
      if (!deletedScenario) {
        response.status(404).json({ error: "Scenario not found" });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export default router;

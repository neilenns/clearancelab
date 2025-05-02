import { Scenario, ScenarioSchema } from "@workspace/validators";
import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyApiKey } from "../middleware/apikey.js";
import { verifyUser } from "../middleware/permissions.js";
import { ScenarioModel } from "../models/scenario.js";

const router = Router();

interface ScenarioQuery {
  summary?: string;
}

router.get(
  "/",
  verifyApiKey,
  async (
    request: Request<unknown, unknown, unknown, ScenarioQuery>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const summary = request.query.summary === "true";
      const scenarios = await ScenarioModel.findAll(summary);

      response.json(scenarios);
    } catch (error) {
      next(error);
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
        response.status(404).json({ error: `${id} is not a valid scenario ID.` });
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
  async (request: Request<unknown, unknown, Scenario>, response: Response, next: NextFunction) => {
    const result = ScenarioSchema.safeParse(request.body);

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

router.put("/:id", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    response.status(404).json({ error: `${id} is not a valid scenario ID.` });
    return;
  }

  const result = ScenarioSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json({
      error: "Invalid scenario data",
      details: result.error.format(),
    });
    return;
  }

  try {
    const updatedScenario = await ScenarioModel.findByIdAndUpdate(id, result.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedScenario) {
      response.status(404).json({ error: "Scenario not found" });
      return;
    }

    response.json(updatedScenario);
  } catch (error) {
    next(error);
  }
});

export default router;

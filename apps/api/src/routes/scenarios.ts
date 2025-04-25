import { Scenario, ScenarioSchema } from "@workspace/validators/scenario";
import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { logger } from "../lib/logger.js";
import { verifyApiKey } from "../middleware/apikey.js";
import { ScenarioModel } from "../models/Scenario.js";

const router = Router();

interface ScenarioQuery {
  summary?: string;
}

router.get(
  "/",
  verifyApiKey,
  async (
    req: Request<unknown, unknown, unknown, ScenarioQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const summary = req.query.summary === "true";

      const scenarios = await ScenarioModel.findAll(summary);

      res.json(scenarios);
    } catch (err) {
      next(err);
    }
  }
);

// Add a route to look up a scenario by ID
router.get(
  "/:id",
  verifyApiKey,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValid = mongoose.isValidObjectId(id);

      if (!isValid) {
        res.status(404).json({ error: `${id} is not a valid scenario ID.` });
        return;
      }

      const scenario = await ScenarioModel.findScenarioById(id);

      if (!scenario) {
        res.status(404).json({ error: "Scenario not found" });
        return;
      }

      res.json(scenario);
    } catch (err) {
      next(err); // Pass to centralized error handler
    }
  }
);

router.post(
  "/",
  async (req: Request<unknown, unknown, Scenario>, res: Response) => {
    const result = ScenarioSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Invalid plan data",
        details: result.error.format(),
      });

      return;
    }

    try {
      const newScenario = new ScenarioModel(result.data);
      const saved = await newScenario.save();

      res.status(201).json(saved);

      return;
    } catch (err: unknown) {
      const error = err as Error;

      logger.error(`Failed to save new scenario: ${error.message}`);
      res.status(500).json({ error: "Failed to save new scenario." });

      return;
    }
  }
);

export default router;

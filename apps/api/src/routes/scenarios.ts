import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyApiKey } from "../middleware/apikey.js";
import { ScenarioModel } from "../models/scenario.js";
import { Scenario } from "@workspace/validators";

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
      const scenarioTest = {} as Scenario;

      console.log("Scenario Test", scenarioTest);
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

export default router;

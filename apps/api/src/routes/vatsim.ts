import { NextFunction, Request, Response, Router } from "express";
import { verifyApiKey } from "../middleware/apikey.js";
import { VatsimFlightPlanModel } from "../models/vatsim-flight-plan.js";

const router = Router();

// Add a route to look up a scenario by ID
router.get(
  "/flightplan/:callsign",
  verifyApiKey,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { callsign } = req.params;

      const flightPlan = await VatsimFlightPlanModel.findByCallsign(callsign);

      if (!flightPlan) {
        res.status(404).json({ error: "Flight plan not found" });
        return;
      }

      res.json(flightPlan);
    } catch (err) {
      next(err); // Pass to centralized error handler
    }
  }
);

export default router;

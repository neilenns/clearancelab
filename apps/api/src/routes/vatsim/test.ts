import { verifyApiKey } from "@middleware/apikey.js";
import { ScenarioResponse } from "@workspace/validators";
import { getFlightPlan } from "@workspace/vatsim";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// Add a route to look up a flight plan by callsign.
router.get(
  "/:callsign",
  verifyApiKey,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { callsign } = request.params;

      const flightPlan = await getFlightPlan(callsign);

      if (!flightPlan) {
        const findResult: ScenarioResponse = {
          success: false,
          message: `Flight plan not found for callsign ${callsign}`,
        };

        response.status(404).json(findResult);
        return;
      }

      response.json(flightPlan);
    } catch (error) {
      next(error); // Pass to centralized error handler
    }
  },
);

export default router;

import { getCallsignTelephony } from "@lib/utilities.js";
import { verifyApiKey } from "@middleware/apikey.js";
import { AirportInfo } from "@models/airport-info.js";
import { ScenarioResponse } from "@workspace/validators";
import { flightPlanToScenario, getFlightPlan } from "@workspace/vatsim";
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

      // This converts the VATSIM flight plan to a base scenario, then it
      // gets populated with additional information from the DB or other web services.
      const scenario = flightPlanToScenario(flightPlan);

      scenario.craft ??= {};
      scenario.craft.telephony = await getCallsignTelephony(scenario);

      scenario.depAirportInfo = await AirportInfo.findByAirportCode(
        scenario.plan.dep,
      );

      scenario.destAirportInfo = await AirportInfo.findByAirportCode(
        scenario.plan.dest,
      );

      const findResult: ScenarioResponse = {
        success: true,
        data: [scenario],
      };

      response.json(findResult);
    } catch (error) {
      next(error); // Pass to centralized error handler
    }
  },
);

export default router;

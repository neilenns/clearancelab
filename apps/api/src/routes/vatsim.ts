import {
  getRandomBcn,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { Plan } from "@workspace/validators";
import { NextFunction, Request, Response, Router } from "express";
import { verifyApiKey } from "../middleware/apikey.js";
import { VatsimFlightPlanModel } from "../models/vatsim-flight-plan.js";

const router = Router();

// Add a route to look up a flight plan by callsign.
router.get(
  "/flightplan/:callsign",
  verifyApiKey,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { callsign } = request.params;

      const flightPlan = await VatsimFlightPlanModel.findByCallsign(callsign);

      if (!flightPlan) {
        response.status(404).json({ error: "Flight plan not found" });
        return;
      }

      const returnedFlightPlan = {
        aid: flightPlan.callsign,
        alt: flightPlan.cruiseAltitude,
        bcn: getRandomBcn(),
        cid: getRandomCid(),
        dep: flightPlan.departure,
        dest: flightPlan.arrival,
        pilotName: getRandomName(),
        rmk: flightPlan.remarks,
        rte: flightPlan.route,
        spd: flightPlan.groundspeed,
        typ: flightPlan.equipmentType,
        eq: flightPlan.equipmentSuffix,
        homeAirport: flightPlan.homeAirport,
        vatsimId: getRandomVatsimId(),
        altimeter: flightPlan.metar?.altimeter,
      } as Plan;

      response.json(returnedFlightPlan);
    } catch (error) {
      next(error); // Pass to centralized error handler
    }
  },
);

export default router;

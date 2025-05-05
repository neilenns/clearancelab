import {
  convertToNumber,
  getRandomBcn,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
  getWeightClass,
  splitCallsign,
} from "@workspace/plantools";
import { Scenario, ScenarioResponse } from "@workspace/validators";
import * as changeCase from "change-case";
import { NextFunction, Request, Response, Router } from "express";
import { verifyApiKey } from "../../middleware/apikey.js";
import { AirlineModel } from "../../models/airlines.js";
import { VatsimFlightPlanModel } from "../../models/vatsim-flight-plan.js";

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
        const findResult: ScenarioResponse = {
          success: false,
          message: `Flight plan not found for callsign ${callsign}`,
        };

        response.status(404).json(findResult);
        return;
      }

      // Calculate the telephony string.
      const callsignParts = splitCallsign(flightPlan.callsign);
      const weightClass = getWeightClass(flightPlan.equipmentType ?? "");

      const airline = callsignParts
        ? await AirlineModel.findByAirlineCode(callsignParts.airlineCode)
        : undefined;

      const telephony = [
        airline?.telephony && changeCase.capitalCase(airline.telephony), // The telephony name, if found, in capital case
        callsignParts?.flightNumber, // The flight number, if found
        weightClass, // The weight class, if found
        !airline?.telephony && flightPlan.callsign, // Include callsign only if telephony is not found
      ]
        .filter(Boolean) // Removes any falsy values like null, undefined, or empty strings
        .join(" ");

      const returnedScenario: Scenario = {
        plan: {
          aid: flightPlan.callsign,
          alt: flightPlan.cruiseAltitude,
          bcn: convertToNumber(flightPlan.squawk) ?? getRandomBcn(),
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
        },
        airportConditions: {
          altimeter: flightPlan.metar?.altimeter,
        },
        craft: {
          telephony,
        },
        isValid: false,
        canClear: false,
        explanations: [],
      };

      const findResult: ScenarioResponse = {
        success: true,
        data: [returnedScenario],
      };

      response.json(findResult);
    } catch (error) {
      next(error); // Pass to centralized error handler
    }
  },
);

export default router;

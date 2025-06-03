import { verifyApiKey } from "@middleware/apikey.js";
import { AirlineModel } from "@models/airlines.js";
import { VatsimFlightPlanModel } from "@models/vatsim-flight-plan.js";
import {
  convertToNumber,
  getRandomCid,
  getRandomExternalBcn,
  getRandomName,
  getRandomVatsimId,
  getWeightClass,
  spellCallsign,
  spellGroupForm,
  splitCallsign,
} from "@workspace/plantools";
import { Scenario, ScenarioResponse } from "@workspace/validators";
import * as changeCase from "change-case";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// Add a route to look up a flight plan by callsign.
router.get(
  "/:callsign",
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
      const weightClass = getWeightClass(
        flightPlan.equipmentType ?? "",
      )?.toLowerCase();

      const airline = callsignParts
        ? await AirlineModel.findByAirlineCode(callsignParts.airlineCode)
        : undefined;

      // If an airline was found, and the callsign was able to get split, use the airline's telephony and the flight number in group form.
      // Otherwise, fall back to just spelling out the callsign.
      let spokenCallsign: string;
      if (airline && callsignParts) {
        try {
          spokenCallsign = `${changeCase.capitalCase(airline.telephony)} ${spellGroupForm(
            callsignParts.flightNumber,
          )}`;
        } catch {
          // Fallback to a fully-spelled callsign if the flight number is invalid
          spokenCallsign = spellCallsign(flightPlan.callsign);
        }
      } else {
        spokenCallsign = spellCallsign(flightPlan.callsign);
      }

      const telephony = [
        spokenCallsign,
        weightClass, // The weight class, if found
      ]
        .filter(Boolean) // Removes any falsy values like null, undefined, or empty strings
        .join(" ");

      const returnedScenario: Scenario = {
        plan: {
          aid: flightPlan.callsign,
          alt: flightPlan.cruiseAltitude,
          bcn: convertToNumber(flightPlan.squawk) ?? getRandomExternalBcn(),
          cid: getRandomCid(),
          dep: flightPlan.departure,
          dest: flightPlan.arrival,
          pilotName: getRandomName(),
          rmk: flightPlan.remarks,
          rte: flightPlan.route,
          spd: flightPlan.cruiseTas,
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
        isDraft: false,
        hasAudio: false,
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

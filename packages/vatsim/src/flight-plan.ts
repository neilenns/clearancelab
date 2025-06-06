import {
  convertToNumber,
  getRandomAirportCode,
  getRandomCid,
  getRandomExternalBcn,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import { VatsimPilot } from "./types";
import { VatsimPrefile } from "./types/vatsim-prefile";
import { splitAircraftType } from "./utilities";
import { getVatsimData } from "./vatsim";

type VatsimFlightPlanResult = VatsimPilot | VatsimPrefile | undefined;

/**
 * Retrieves a flight plan from VATSIM. Returns undefined if the flight isn't found.
 * @param callsign The callsign of the flight to retrieve.
 * @returns Either the flight plan, prefile, or undefined.
 */
export async function getFlightPlan(
  callsign: string,
): Promise<VatsimFlightPlanResult> {
  try {
    const vatsimData = await getVatsimData();

    // Try finding a prefile first. If that fails, find a pilot.
    const result =
      vatsimData.prefiles.find((prefile) => prefile.callsign === callsign) ??
      vatsimData.pilots.find((pilot) => pilot.callsign === callsign);

    return result;
  } catch (error) {
    console.error("Unable to get Vatsim flight plans:", error);
    return;
  }
}

export function flightPlanToScenario(
  flightPlan: VatsimFlightPlanResult,
): Scenario {
  if (!flightPlan?.callsign) {
    console.error("VATSIM flight plans must have a callsign.");
    throw new Error("VATSIM flight plans must have a callsign");
  }

  const [equipmentCode, equipmentSuffix] = splitAircraftType(
    flightPlan.flight_plan?.aircraft_faa,
  );

  const scenario: Scenario = {
    plan: {
      aid: flightPlan.callsign,
      alt: (convertToNumber(flightPlan.flight_plan?.altitude) ?? 0) / 100,
      bcn:
        convertToNumber(flightPlan.flight_plan?.assigned_transponder) ??
        getRandomExternalBcn(),
      cid: getRandomCid(),
      dep: flightPlan.flight_plan?.departure,
      dest: flightPlan.flight_plan?.arrival,
      pilotName: getRandomName(),
      rmk: flightPlan.flight_plan?.remarks,
      rte: flightPlan.flight_plan?.route,
      spd: convertToNumber(flightPlan.flight_plan?.cruise_tas),
      typ: equipmentCode,
      eq: equipmentSuffix,
      homeAirport: getRandomAirportCode(),
      vatsimId: getRandomVatsimId(),
    },
    airportConditions: {},
    craft: {},
    isValid: true,
    isDraft: true,
    hasAudio: false,
    explanations: [],
  };

  return scenario;
}

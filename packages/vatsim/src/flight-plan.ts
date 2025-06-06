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

type VatsimFlightPlan = VatsimPilot | VatsimPrefile | undefined;

/**
 * Retrieves a flight plan from VATSIM. Returns undefined if the flight isn't found.
 * @param callsign The callsign of the flight to retrieve.
 * @returns Either the flight plan, prefile, or undefined.
 */
export async function getFlightPlan(
  callsign: string,
): Promise<VatsimFlightPlan> {
  try {
    const vatsimData = await getVatsimData();
    let result: VatsimFlightPlan;

    // Try and find a prefile first.
    result = vatsimData.prefiles.find(
      (prefile) => prefile.callsign === callsign,
    );

    // If there's no matching prefile try the pilots.
    result ??= vatsimData.pilots.find((pilot) => pilot.callsign === callsign);

    return result;
  } catch (error) {
    console.error("Unable to get Vatsim flight plans:", error);
    return;
  }
}

export function flightPlanToScenario(flightPlan: VatsimFlightPlan) {
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
      alt: convertToNumber(flightPlan.flight_plan?.altitude),
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
    isValid: true,
    isDraft: true,
    hasAudio: false,
    explanations: [],
  };

  return scenario;
}

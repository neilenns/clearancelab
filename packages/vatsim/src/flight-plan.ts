import { VatsimPilot } from "./types";
import { VatsimPrefile } from "./types/vatsim-prefile";
import { getVatsimData } from "./vatsim";

/**
 * Retrieves a flight plan from VATSIM. Returns undefined if the flight isn't found.
 * @param callsign The callsign of the flight to retrieve.
 * @returns Either the flight plan, prefile, or undefined.
 */
export async function getFlightPlan(
  callsign: string,
): Promise<VatsimPilot | VatsimPrefile | undefined> {
  try {
    const vatsimData = await getVatsimData();

    // Try and find a prefile first.
    const prefile = vatsimData.prefiles.find(
      (prefile) => prefile.callsign === callsign,
    );
    if (prefile) {
      return prefile;
    }

    // If there's no matching prefile try the pilots.
    const pilot = vatsimData.pilots.find(
      (pilot) => pilot.callsign === callsign,
    );

    if (pilot) {
      return pilot;
    }

    // Nothing found, return undefined.
    return;
  } catch (error) {
    console.error("Unable to get Vatsim flight plans:", error);
    return;
  }

  return;
}

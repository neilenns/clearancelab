"use server";

import { ApiResponse, getJson } from "@/lib/api";
import { Scenario } from "@workspace/validators";
export type FetchPlanByCallsignState =
  | {
      success: true;
      scenario: Scenario;
    }
  | {
      success: false;
      message: string;
    };

export async function fetchPlanByCallsign(
  callsign: string,
): Promise<FetchPlanByCallsignState> {
  const requestedCallsign = callsign.toUpperCase().trim();

  if (!requestedCallsign) {
    return {
      success: false,
      message: "Please enter a callsign.",
    };
  }

  let scenario: ApiResponse<Scenario>;

  try {
    scenario = await getJson<Scenario>(
      `/vatsim/flightplan/${requestedCallsign}`,
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error
          ? `Error fetching flight plan: ${error.message}`
          : "Unable to fetch flight plan.",
    };
  }

  if (!scenario || !scenario.data) {
    return {
      success: false,
      message: `No flight plan found for ${requestedCallsign}.`,
    };
  }

  return {
    success: true,
    scenario: scenario.data,
  };
}

"use server";

import { Scenario } from "@/db/scenarios";
import { getJson } from "@/lib/api";

type FetchPlanByCallsignResponse =
  | {
      success: true;
      data: Scenario;
    }
  | {
      success: false;
      error: string;
    };

export async function fetchPlanByCallsign(
  callsign: string,
): Promise<FetchPlanByCallsignResponse> {
  const requestedCallsign = callsign.toUpperCase().trim();

  if (!requestedCallsign) {
    return {
      success: false,
      error: "No callsign provided",
    };
  }

  try {
    const response = await getJson(`/vatsim/flightplan/${requestedCallsign}`);

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to fetch flight plan",
      };
    }

    return {
      success: false,
      error: "No flight plan found",
    };
  } catch (error) {
    console.error("Error fetching VATSIM flight plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

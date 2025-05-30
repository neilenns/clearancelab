"use server";

import { getJson } from "@/lib/api";
import { fetchScenariosResponseSchema, Scenario } from "@workspace/validators";

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

    const data = await response.json();
    const parsedData = fetchScenariosResponseSchema.parse(data);

    if (
      !parsedData.success ||
      !parsedData.data ||
      parsedData.data.length === 0
    ) {
      return {
        success: false,
        error: "No flight plan found",
      };
    }

    return {
      success: true,
      data: parsedData.data[0],
    };
  } catch (error) {
    console.error("Error fetching VATSIM flight plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

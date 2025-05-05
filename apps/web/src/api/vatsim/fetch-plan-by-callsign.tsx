"use server";

import { getJson } from "@/lib/api";
import { fetchScenariosResponseSchema, Scenario } from "@workspace/validators";

export async function fetchPlanByCallsign(
  callsign: string,
): Promise<Scenario | undefined> {
  const requestedCallsign = callsign.toUpperCase().trim();

  if (!requestedCallsign) {
    return;
  }

  try {
    const response = await getJson(`/vatsim/flightplan/${requestedCallsign}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch VATSIM flight plan: ${response.statusText}`,
      );
    }

    const data = await response.json();
    const parsedData = fetchScenariosResponseSchema.parse(data);

    if (
      !parsedData.success ||
      !parsedData.data ||
      parsedData.data.length === 0
    ) {
      return;
    }

    return parsedData.data[0];
  } catch (error) {
    console.error("Error fetching VATSIM flight plan:", error);
    return;
  }
}

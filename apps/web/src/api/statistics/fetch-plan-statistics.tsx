"use server";

import { getJson } from "@/lib/api";
import {
  GenericErrorResponse,
  planStatisticsResponseSchema,
} from "@workspace/validators";

export const fetchPlanStatistics = async () => {
  try {
    // This isn't cached so a static version of the page doesn't get generated at build time.
    const response = await getJson("/statistics/plans", {
      withAuthToken: true,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch statistics:", response.statusText);
      const fetchResponse: GenericErrorResponse = {
        success: false,
        message: "Failed to fetch plan statistics.",
      };

      return fetchResponse;
    }

    const data = await response.json();
    return planStatisticsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    const fetchResponse: GenericErrorResponse = {
      success: false,
      message: "Failed to fetch plan statistics.",
    };
    return fetchResponse;
  }
};

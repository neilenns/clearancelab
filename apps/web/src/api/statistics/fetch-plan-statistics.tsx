"use server";

import { getJson } from "@/lib/api";
import {
  GenericErrorResponse,
  planStatisticsResponseSchema,
} from "@workspace/validators";

export const fetchPlanStatistics = async () => {
  try {
    const response = await getJson("/statistics/plans");

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

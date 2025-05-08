import { z } from "zod";
import { genericErrorResponseSchema } from "./error-response";

export const statisticSchema = z.object({
  item: z.string(),
  count: z.number(),
});

export const planStatisticsSchema = z.object({
  departures: z.array(statisticSchema),
  destinations: z.array(statisticSchema),
  canClear: z.array(statisticSchema),
  isValid: z.array(statisticSchema),
});

export const planStatisticsSuccessSchema = z.object({
  success: z.literal(true),
  data: planStatisticsSchema,
});

export const planStatisticsResponseSchema = z.union([
  planStatisticsSuccessSchema,
  genericErrorResponseSchema,
]);

export type Statistic = z.infer<typeof statisticSchema>;
// Can't use z.infer here because it doesn't bring along Statistic
// as an explicit type for departures and destinations.
export interface PlanStatistics {
  departures: Statistic[];
  destinations: Statistic[];
  canClear: Statistic[];
  isValid: Statistic[];
}
export type PlanStatisticsResponse = z.infer<
  typeof planStatisticsResponseSchema
>;

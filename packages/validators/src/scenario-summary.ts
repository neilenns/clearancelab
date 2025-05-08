import { z } from "zod";
import { genericErrorResponseSchema } from "./error-response";
import { paginationSchema } from "./pagination";

// Summary schema — includes only core fields
export const scenarioSummarySchema = z.object({
  _id: z.string(),
  isValid: z.boolean(),
  canClear: z.boolean(),
  plan: z.object({
    dep: z.string().optional(),
    dest: z.string().optional(),
    aid: z.string(),
    rte: z.string().optional(),
  }),
});

export const scenarioSummarySuccessSchema = z.object({
  success: z.literal(true),
  data: z.array(scenarioSummarySchema),
  pagination: paginationSchema.optional(),
});

export const fetchScenariosSummaryResponseSchema = z.union([
  scenarioSummarySuccessSchema,
  genericErrorResponseSchema,
]);

export type ScenarioSummary = z.infer<typeof scenarioSummarySchema>;
export type ScenarioSummaryResponse = z.infer<
  typeof fetchScenariosSummaryResponseSchema
>;

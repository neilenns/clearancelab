import { z } from "zod";
import { AirportConditionsSchema } from "./airport-conditions.js";
import { AirportInfoSchema } from "./airport-info.js";
import { CraftSchema } from "./craft.js";
import { ExplanationSchema } from "./explanations.js";
import { PlanSchema } from "./plan.js";

export const scenarioSchema = z.object({
  _id: z.string().optional(),
  isValid: z.boolean().default(true),
  canClear: z.boolean().default(true),
  airportConditions: AirportConditionsSchema,
  craft: CraftSchema.optional(),
  depAirportInfo: AirportInfoSchema.optional(),
  destAirportInfo: AirportInfoSchema.optional(),
  plan: PlanSchema,
  explanations: z.array(ExplanationSchema).default([]),
});

// Summary schema — includes only core fields
export const scenarioSummarySchema = z.object({
  _id: z.string(),
  isValid: z.boolean(),
  canClear: z.boolean(),
  plan: z.object({
    dep: z.string().optional(),
    dest: z.string().optional(),
    aid: z.string(),
  }),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_pages: z.number(),
  total_items: z.number(),
});

export const scenarioListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(scenarioSchema),
  pagination: paginationSchema.optional(),
});

export const scenarioSummaryResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(scenarioSummarySchema),
  pagination: paginationSchema.optional(),
});

export const genericErrorResponseSchema = z.object({
  success: z.literal(false),
  data: z.undefined(),
});

// Final schemas used per endpoint
export const getScenarioListSchema = z.union([
  scenarioListResponseSchema,
  genericErrorResponseSchema,
]);

export const getScenarioSummaryListSchema = z.union([
  scenarioSummaryResponseSchema,
  genericErrorResponseSchema,
]);

// TypeScript types
export type Scenario = z.infer<typeof scenarioSchema>;
export type ScenarioSummary = z.infer<typeof scenarioSummarySchema>;

export type ScenarioListResponse = z.infer<typeof getScenarioListSchema>;
export type ScenarioSummaryListResponse = z.infer<
  typeof getScenarioSummaryListSchema
>;
export type ScenarioErrorResponse = z.infer<typeof genericErrorResponseSchema>;

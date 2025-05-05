import { z } from "zod";
import { AirportConditionsSchema } from "./airport-conditions.js";
import { AirportInfoSchema } from "./airport-info.js";
import { CraftSchema } from "./craft.js";
import { genericErrorResponseSchema } from "./error-response.js";
import { ExplanationSchema } from "./explanations.js";
import { paginationSchema } from "./pagination.js";
import { PlanSchema } from "./plan.js";

export const scenarioSchema = z.object({
  _id: z.string().optional(),
  isValid: z.boolean().default(true),
  canClear: z.boolean().default(true),
  airportConditions: AirportConditionsSchema,
  craft: CraftSchema.optional(),
  depAirportInfo: AirportInfoSchema.optional().nullable(),
  destAirportInfo: AirportInfoSchema.optional().nullable(),
  plan: PlanSchema,
  explanations: z.array(ExplanationSchema).default([]),
});

export const scenarioListSuccessSchema = z.object({
  success: z.literal(true),
  data: z.array(scenarioSchema),
  pagination: paginationSchema.optional(),
});

// Final schemas used per endpoint
export const fetchScenariosResponseSchema = z.union([
  scenarioListSuccessSchema,
  genericErrorResponseSchema,
]);

export const addOrUpdateScenarioSuccessSchema = z.object({
  success: z.literal(true),
  data: scenarioSchema,
});

export const addOrUpdateScenarioResponseSchema = z.union([
  addOrUpdateScenarioSuccessSchema,
  genericErrorResponseSchema,
]);

export const deleteSuccessResponseSchema = z.object({
  success: z.literal(true),
});

export const deleteScenarioResponseSchema = z.union([
  deleteSuccessResponseSchema,
  genericErrorResponseSchema,
]);

// TypeScript types
export type Scenario = z.infer<typeof scenarioSchema>;
export type ScenarioInput = z.input<typeof scenarioSchema>;
export type ScenarioResponse = z.infer<typeof fetchScenariosResponseSchema>;
export type AddOrUpdateScenarioResponse = z.infer<
  typeof addOrUpdateScenarioResponseSchema
>;
export type DeleteScenarioResponse = z.infer<
  typeof deleteScenarioResponseSchema
>;

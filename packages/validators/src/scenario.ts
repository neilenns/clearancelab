import { z } from "zod";
import { AirportInfoSchema } from "./airport-info.js";
import { CraftSchema } from "./craft.js";
import { PlanSchema } from "./plan.js";
import { ProblemSchema } from "./problems.js";
import { AirportConditionsSchema } from "./airport-conditions.js";

export const ScenarioSchema = z.object({
  _id: z.string().optional(),
  isValid: z.boolean().default(true),
  canClear: z.boolean().default(true),
  airportConditions: AirportConditionsSchema,
  craft: CraftSchema.optional(),
  depAirportInfo: AirportInfoSchema.optional(),
  destAirportInfo: AirportInfoSchema.optional(),
  plan: PlanSchema,
  problems: z.array(ProblemSchema).default([]),
});

// Type definition *before* any parsing, for example isValid is a string not a boolean.
export type ScenarioInput = z.input<typeof ScenarioSchema>;

// Type definition *after* parsing, for example isValid is a boolean.
export type Scenario = z.infer<typeof ScenarioSchema>;

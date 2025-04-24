import { Types } from "mongoose";
import { z } from "zod";
import { AirportInfoSchema } from "./airport-info.js";
import { CraftSchema } from "./craft.js";
import { PlanSchema } from "./plan.js";

export const ScenarioSchema = z.object({
  _id: z.union([
    z.instanceof(Types.ObjectId),
    z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId format",
    }),
  ]),
  canClear: z.boolean(),
  craft: CraftSchema,
  depAirportInfo: AirportInfoSchema,
  destAirportInfo: AirportInfoSchema,
  isValid: z.boolean(),
  plan: PlanSchema,
});

export type Scenario = z.infer<typeof ScenarioSchema>;

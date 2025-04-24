import { Types } from "mongoose";
import { z } from "zod";
import { airportInfoSchema } from "./airport-info.js";
import { craftSchema } from "./craft.js";
import { planSchema } from "./plan.js";

export const scenarioSchema = z.object({
  _id: z.union([
    z.instanceof(Types.ObjectId),
    z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId format",
    }),
  ]),
  canClear: z.boolean(),
  craft: craftSchema,
  depAirportInfo: airportInfoSchema,
  destAirportInfo: airportInfoSchema,
  isValid: z.boolean(),
  plan: planSchema,
});

export type Scenario = z.infer<typeof scenarioSchema>;

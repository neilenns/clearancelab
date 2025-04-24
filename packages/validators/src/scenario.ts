import { Types } from "mongoose";
import { z } from "zod";
import { airportInfoSchema } from "./airport-info";
import { craftSchema } from "./craft";
import { planSchema } from "./plan";

export const scenarioSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  canClear: z.boolean(),
  craft: craftSchema,
  depAirportInfo: airportInfoSchema,
  destAirportInfo: airportInfoSchema,
  isValid: z.boolean(),
  plan: planSchema,
});

export type Scenario = z.infer<typeof scenarioSchema>;

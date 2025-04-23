import { Types } from "mongoose";
import { z } from "zod";
import { AirportInfoValidator } from "./airportInfo";

// Custom Zod type for Types.ObjectId
const ObjectIdSchema = z.custom<Types.ObjectId>(
  (val) => val instanceof Types.ObjectId,
  {
    message: "Invalid ObjectId",
  }
);

export const ScenarioSchema = z.object({
  _id: ObjectIdSchema,

  plan: z.object({
    pilotName: z.string().optional(),
    aid: z.string(),
    vatsimId: z.number().optional(),
    cid: z.number().optional(),
    typ: z.string(),
    eq: z.string(),
    bcn: z.number().optional(),
    dep: z.string(),
    dest: z.string(),
    spd: z.number().optional(),
    alt: z.number(),
    rte: z.string(),
    rmk: z.string().optional(),
    raw: z.string().optional(),
    airportConditions: z.string().optional(),
  }),

  craft: z
    .object({
      altitude: z.string().optional(),
      clearanceLimit: z.string().optional(),
      controllerName: z.string().optional(),
      frequency: z.string().optional(),
      route: z.string().optional(),
      telephony: z.string().optional(),
      transponder: z.string().optional(),
    })
    .optional(),

  depAirportInfo: AirportInfoValidator.optional(),
  destAirportInfo: AirportInfoValidator.optional(),

  problems: z.array(
    z.object({
      level: z.enum(["info", "warning", "error"]),
      issue: z.string(),
      solution: z.string(),
    })
  ),

  isValid: z.boolean(),
  canClear: z.boolean(),
});

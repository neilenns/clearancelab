import { z } from "zod";

export enum FlowDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export const AirportConditionsSchema = z.object({
  flow: z.nativeEnum(FlowDirection),
  altimeter: z.coerce.number().gte(28).lte(31),
  departureOnline: z.boolean().default(false),
});

export type AirportConditions = z.infer<typeof AirportConditionsSchema>;

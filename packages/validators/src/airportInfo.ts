import { z } from "zod";

export const AirportInfoValidator = z
  .object({
    airportCode: z.string(),
    icaoCode: z.string().optional(),
    iataCode: z.string().optional(),
    name: z.string().optional(),
    elevation: z.number().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    timezone: z.string().optional(),
    countryCode: z.string().optional(),
  })
  .strict();

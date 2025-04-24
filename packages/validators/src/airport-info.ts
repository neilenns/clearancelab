import { z } from "zod";

export const airportInfoSchema = z.object({
  airportCode: z.string(),
  city: z.string().optional(),
  countryCode: z.string().optional(),
  elevation: z.number().optional(),
  iataCode: z.string().optional(),
  icaoCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  name: z.string().optional(),
  state: z.string().optional(),
  timezone: z.string().optional(),
});

export type AirportInfo = z.infer<typeof airportInfoSchema>;

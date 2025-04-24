import { z } from "zod";

export const planSchema = z.object({
  aid: z.string(),
  airportConditions: z.string().optional(),
  alt: z.string().optional(),
  bcn: z.number({ message: "BCN must be a number." }).optional(),
  cid: z.coerce.number({ message: "CID must be a number." }).optional(),
  dep: z.string().optional(),
  dest: z.string().optional(),
  eq: z.string().optional(),
  pilotName: z.string().optional(),
  raw: z.string().optional(),
  rmk: z.string().optional(),
  rte: z.string().optional(),
  spd: z.number({ message: "SPD must be a number." }).optional(),
  typ: z.string().optional(),
  vatsimId: z.number(),
});

export type Plan = z.infer<typeof planSchema>;

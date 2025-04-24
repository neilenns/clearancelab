import { z } from "zod";

export const planSchema = z.object({
  aid: z.string(),
  airportConditions: z.string().optional(),
  alt: z.number(),
  bcn: z.number().optional(),
  cid: z.coerce.number().optional(),
  dep: z.string(),
  dest: z.string(),
  eq: z.string(),
  pilotName: z.string().optional(),
  raw: z.string().optional(),
  rmk: z.string().optional(),
  rte: z.string(),
  spd: z.number().optional(),
  typ: z.string(),
  vatsimId: z.number().optional(),
});

export type Plan = z.infer<typeof planSchema>;

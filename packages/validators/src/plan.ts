import { z } from "zod";

export const planSchema = z.object({
  aid: z.string(),
  airportConditions: z.string().optional(),
  alt: z.string().optional(),
  bcn: z.coerce.number().optional(),
  cid: z.coerce.number().optional(),
  dep: z.string().optional(),
  dest: z.string().optional(),
  eq: z.string().optional(),
  pilotName: z.string().optional(),
  raw: z.string().optional(),
  rmk: z.string().optional(),
  rte: z.string().optional(),
  spd: z.coerce.number().optional(),
  typ: z.string().optional(),
  vatsimId: z.number(),
});

export type Plan = z.infer<typeof planSchema>;

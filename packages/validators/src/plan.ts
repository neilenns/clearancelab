import { z } from "zod";

export const PlanSchema = z.object({
  aid: z.string(),
  alt: z.coerce.number().optional(),
  bcn: z.coerce.number().optional(),
  cid: z.coerce.number().optional(),
  dep: z.string().optional(),
  dest: z.string().optional(),
  eq: z.string().optional(),
  homeAirport: z.string().optional(),
  pilotName: z.string().optional(),
  rmk: z.string().optional(),
  rte: z.string().optional(),
  spd: z.coerce.number().optional(),
  typ: z.string().optional(),
  vatsimId: z.coerce.number(),
});

export type Plan = z.infer<typeof PlanSchema>;

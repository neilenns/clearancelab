import { z } from "zod";

export const craftSchema = z.object({
  altitude: z.string().optional(),
  clearanceLimit: z.string().optional(),
  controllerName: z.string().optional(),
  frequency: z.string().optional(),
  route: z.string().optional(),
  telephony: z.string().optional(),
  transponder: z.string().optional(),
});

export type Craft = z.infer<typeof craftSchema>;

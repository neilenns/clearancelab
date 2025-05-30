import { z } from "zod";

export const CraftSchema = z.object({
  altitude: z.string().optional(),
  clearanceLimit: z.string().optional(),
  controllerName: z.string().optional(),
  frequency: z.coerce.number().optional(),
  route: z.string().optional(),
  telephony: z.string().optional(),
});

export type Craft = z.infer<typeof CraftSchema>;

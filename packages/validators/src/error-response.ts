import { z } from "zod";

export const genericErrorResponseSchema = z.object({
  success: z.literal(false),
  data: z.undefined(),
});

export type ScenarioErrorResponse = z.infer<typeof genericErrorResponseSchema>;

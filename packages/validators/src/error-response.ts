import { z } from "zod";

export const genericErrorResponseSchema = z.object({
  success: z.literal(false),
  data: z.undefined(),
  message: z.string().optional(),
});

export type GenericErrorResponse = z.infer<typeof genericErrorResponseSchema>;

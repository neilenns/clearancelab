import { z } from "zod";

export const ExplanationLevelEnum = z.enum(["ok", "tip", "info", "warning", "error"]);

export const ExplanationSchema = z.object({
  level: ExplanationLevelEnum,
  headline: z.string(),
  description: z.string(),
});

export type ExplanationLevel = z.infer<typeof ExplanationLevelEnum>;
export type Explanation = z.infer<typeof ExplanationSchema>;

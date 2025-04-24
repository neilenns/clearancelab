import { z } from "zod";

export const ProblemLevelEnum = z.enum(["info", "warning", "error"]);

export const ProblemSchema = z.array(
  z.object({
    level: ProblemLevelEnum,
    issue: z.string(),
    solution: z.string(),
  })
);

export type ProblemLevel = z.infer<typeof ProblemLevelEnum>;
export type Problems = z.infer<typeof ProblemSchema>;

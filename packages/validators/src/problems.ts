import { z } from "zod";

export const problemLevelEnum = z.enum(["info", "warning", "error"]);

export const problemsSchema = z.array(
  z.object({
    level: problemLevelEnum,
    issue: z.string(),
    solution: z.string(),
  })
);

export type ProblemLevel = z.infer<typeof problemLevelEnum>;
export type Problems = z.infer<typeof problemsSchema>;

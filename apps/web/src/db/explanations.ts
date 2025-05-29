import { InferSelectModel } from "drizzle-orm";
import { explanations, Level } from "./schema";

// Override the type for the `level` property
export type Explanation = Omit<
  InferSelectModel<typeof explanations>,
  "level"
> & {
  level: Level;
};

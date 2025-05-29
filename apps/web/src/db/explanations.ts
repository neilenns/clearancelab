import { InferSelectModel } from "drizzle-orm";
import { explanations } from "./schema";

export type Explanation = InferSelectModel<typeof explanations>;

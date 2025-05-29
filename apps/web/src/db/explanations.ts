import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { getDatabaseAsync } from ".";
import { explanations, Level } from "./schema";

// Override the type for the `level` property
export type Explanation = Omit<
  InferSelectModel<typeof explanations>,
  "level"
> & {
  level: Level;
};

export const insertExplanation = async (
  explanation: ExplanationInsertModel,
) => {
  try {
    const database = await getDatabaseAsync();

    return await database
      .insert(explanations)
      .values(explanation)
      .returning({ insertedId: explanations.id });
  } catch (error) {
    console.error("Error inserting explanation:", error);
    throw error;
  }
};

export const deleteExplanationsForScenario = async (scenarioId: number) => {
  try {
    const database = await getDatabaseAsync();

    return await database
      .delete(explanations)
      .where(eq(explanations.scenarioId, scenarioId));
  } catch (error) {
    console.error("Error deleting explanations:", error);
    throw error;
  }
};

export type ExplanationInsertModel = InferInsertModel<typeof explanations>;

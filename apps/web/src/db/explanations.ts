import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { getDatabaseAsync } from ".";
import { explanations } from "./schema";

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

export type Explanation = InferSelectModel<typeof explanations>;
export type ExplanationInsertModel = InferInsertModel<typeof explanations>;

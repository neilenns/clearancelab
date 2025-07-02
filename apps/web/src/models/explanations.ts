import { Schema } from "mongoose";

// Define the level type
export enum Level {
  ERROR = "error",
  INFO = "info",
  TIP = "tip",
  WARNING = "warning",
}

export interface Explanation {
  headline: string;
  level: Level;
  description: string;
}

export const ExplanationSchema = new Schema<Explanation>({
  headline: { type: String, required: true },
  level: {
    type: String,
    enum: Object.values(Level),
    required: true,
  },
  description: { type: String, required: true },
});

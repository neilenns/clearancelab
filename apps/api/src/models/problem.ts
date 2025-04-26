import { Schema } from "mongoose";

export interface Problem {
  issue: string;
  level: "info" | "warning" | "error";
  solution: string;
}

export const ProblemSchema = new Schema<Problem>({
  issue: { type: String, required: true },
  level: {
    type: String,
    enum: ["info", "warning", "error"],
    required: true,
  },
  solution: { type: String, required: true },
});

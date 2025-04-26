import { Schema } from "mongoose";

export interface Plan {
  aid: string;
  alt: number;
  bcn?: number;
  cid?: number;
  dep: string;
  dest: string;
  eq: string;
  pilotName?: string;
  raw?: string;
  rmk?: string;
  rte: string;
  spd?: number;
  typ: string;
  vatsimId?: number;
}

export const PlanSchema = new Schema<Plan>({
  pilotName: { type: String },
  aid: { type: String, required: true },
  vatsimId: { type: Number },
  cid: { type: Number },
  typ: { type: String, required: true },
  eq: { type: String, required: true },
  bcn: { type: Number },
  dep: { type: String, required: true },
  dest: { type: String, required: true },
  spd: { type: Number },
  alt: {
    type: Number,
    required: true,
    min: [0, "Altitude cannot be negative"],
  },
  rte: { type: String, required: true },
  rmk: { type: String },
  raw: { type: String },
});

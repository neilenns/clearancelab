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
  aid: { type: String, required: true },
  alt: {
    type: Number,
    required: true,
    min: [0, "Altitude cannot be negative"],
  },
  bcn: { type: Number },
  cid: { type: Number },
  dep: { type: String, required: true },
  dest: { type: String, required: true },
  eq: { type: String, required: true },
  pilotName: { type: String },
  rmk: { type: String },
  rte: { type: String, required: true },
  spd: { type: Number },
  typ: { type: String, required: true },
  vatsimId: { type: Number },
});

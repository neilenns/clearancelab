import { Schema } from "mongoose";

export interface Plan {
  aid: string;
  alt?: number;
  bcn?: number;
  cid?: number;
  dep?: string;
  dest?: string;
  eq?: string;
  pilotName?: string;
  homeAirport?: string;
  raw?: string;
  rmk?: string;
  rte?: string;
  spd?: number;
  typ?: string;
  vatsimId: number;
}

export const PlanSchema = new Schema<Plan>({
  aid: { type: String, required: true },
  alt: {
    type: Number,
    min: [0, "Altitude cannot be negative"],
  },
  bcn: { type: Number },
  cid: { type: Number },
  dep: { type: String },
  dest: { type: String },
  eq: { type: String },
  pilotName: { type: String },
  homeAirport: { type: String },
  rmk: { type: String },
  rte: { type: String },
  spd: { type: Number },
  typ: { type: String },
  vatsimId: { type: Number, required: true },
});

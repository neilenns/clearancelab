import { Schema } from "mongoose";

export interface Craft {
  altitude?: string;
  clearanceLimit?: string;
  controllerName?: string;
  frequency?: number;
  route?: string;
  telephony?: string;
}

export const CraftSchema = new Schema<Craft>({
  altitude: { type: String, trim: true },
  clearanceLimit: { type: String, trim: true },
  controllerName: { type: String, trim: true },
  frequency: { type: Number },
  route: { type: String, trim: true },
  telephony: { type: String, trim: true },
});

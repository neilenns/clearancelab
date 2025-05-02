import { Schema } from "mongoose";

export interface Craft {
  altitude?: string;
  clearanceLimit?: string;
  controllerName?: string;
  frequency?: string;
  route?: string;
  telephony?: string;
  transponder?: string;
}

export const CraftSchema = new Schema<Craft>({
  altitude: { type: String, trim: true },
  clearanceLimit: { type: String, trim: true },
  controllerName: { type: String, trim: true },
  frequency: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => !v || /^\d{3}\.\d{2,3}$/.test(v),
      message: (properties: { value: string }) =>
        `${properties.value} is not a valid frequency format.`,
    },
  },
  route: { type: String, trim: true },
  telephony: { type: String, trim: true },
  transponder: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => !v || /^\d{4}$/.test(v),
      message: (properties: { value: string }) =>
        `${properties.value} is not a valid transponder code.`,
    },
  },
});

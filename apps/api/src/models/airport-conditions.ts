import { FlowDirection } from "@workspace/validators";
import { Schema } from "mongoose";

export interface AirportConditions {
  flow: FlowDirection;
  altimeter: number;
  departureOnline: boolean;
}

export const AirportConditionsSchema = new Schema<AirportConditions>({
  flow: { type: String, enum: Object.values(FlowDirection), trim: true },
  altimeter: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v >= 28 && v <= 31,
      message: (properties: { value: number }) =>
        `${properties.value.toString()} is not a valid altimeter setting.`,
    },
  },
  departureOnline: { type: Boolean, default: false },
});

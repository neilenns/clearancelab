import { Schema } from "mongoose";

export enum FlowDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

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
      validator: (v: number) => v >= 28.0 && v <= 31.0,
      message: (props: { value: number }) =>
        `${props.value.toString()} is not a valid altimeter setting.`,
    },
  },
  departureOnline: { type: Boolean, default: false },
});

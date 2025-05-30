import mongoose, { Schema } from "mongoose";

export interface IMetar {
  icao: string;
  metar: string;
  source: string;
  altimeter?: number;
}

const MetarSchema = new Schema<IMetar>(
  {
    icao: { type: String, required: true },
    metar: { type: String, required: true },
    source: { type: String, required: true },
    altimeter: { type: Number, required: false },
  },
  { timestamps: true },
);

export const Metar = mongoose.model<IMetar>("Metar", MetarSchema);

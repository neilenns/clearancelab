import mongoose, { Document, Schema } from "mongoose";

export interface AirportInfoData extends Document {
  airportCode: string;
  city?: string;
  countryCode?: string;
  elevation?: number;
  iataCode?: string;
  icaoCode?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  state?: string;
  timezone?: string;
}

const AirportInfoSchema: Schema = new Schema(
  {
    airportCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      alias: "airport_code",
    },
    icaoCode: { type: String, alias: "code_icao" },
    iataCode: { type: String, alias: "code_iata" },
    name: { type: String },
    elevation: { type: Number },
    city: { type: String },
    state: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    timezone: { type: String },
    countryCode: { type: String, alias: "country_code" },
  },
  {
    collection: "airportinfo",
  },
);

export const AirportInfo = mongoose.model<AirportInfoData>("AirportInfo", AirportInfoSchema);

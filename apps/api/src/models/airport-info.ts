import mongoose, { Document, Model, Schema } from "mongoose";

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

// Define the interface for your static methods
interface AirportInfoModel extends Model<AirportInfoData> {
  findByAirportCode(airportCode?: string): Promise<AirportInfoData | null>;
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
    statics: {
      async findByAirportCode(airportCode?: string) {
        if (!airportCode) {
          return;
        }

        return await this.findOne({ airportCode }).lean();
      },
    },
  },
);

// Use the extended interface when creating the model
export const AirportInfo = mongoose.model<AirportInfoData, AirportInfoModel>(
  "AirportInfo",
  AirportInfoSchema,
);

import mongoose, { Document, Model, Schema } from "mongoose";

export interface AirportInfoData extends Document {
  airportCode: string;
  name?: string;
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
    name: { type: String },
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

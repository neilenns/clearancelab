import mongoose, { Schema } from "mongoose";

export interface Airline {
  airlineCode: string;
  telephony: string;
}

// Static method interface
// There is no way in Mongoose to tell TypeScript about the static methods when creating a model
// so you have to extend the interface with the static methods. See
// https://mongoosejs.com/docs/typescript/statics-and-methods.html.
interface AirlineModelType extends mongoose.Model<Airline> {
  findByAirlineCode(callsign: string): Promise<Airline | null>;
}

const AirlineSchema = new Schema<Airline, AirlineModelType>(
  {
    airlineCode: { type: String, required: true, index: true },
    telephony: { type: String, required: true },
  },
  {
    collection: "airlines",
  },
);

AirlineSchema.statics.findByAirlineCode = async function (
  airlineCode: string,
): Promise<Airline | null> {
  return await this.findOne({ airlineCode }).lean();
};

export const AirlineModel = mongoose.model<Airline, AirlineModelType>(
  "Airline",
  AirlineSchema,
);

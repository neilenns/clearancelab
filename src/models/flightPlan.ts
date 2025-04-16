import Env from "@/lib/env";
import {
  deleteModelWithClass,
  getModelForClass,
  mongoose,
  prop,
} from "@typegoose/typegoose";

export class FlightPlan {
  @prop() pilotName?: string;
  @prop({ required: true }) aid!: string; // Callsign
  @prop() vatsimId?: number;
  @prop() cid?: number;
  @prop({ required: true }) typ!: string;
  @prop({ required: true }) eq!: string;
  @prop() bcn?: number;
  @prop({ required: true }) dep!: string;
  @prop({ required: true }) dest!: string;
  @prop() spd?: number;
  @prop({ required: true }) alt!: number;
  @prop({ required: true }) rte!: string;
  @prop() rmk?: string;
  @prop() raw?: string;
  @prop() airportConditions?: string;
}

if (process.env.NODE_ENV === "development") {
  try {
    mongoose.deleteModel("FlightPlan");
  } catch {
    // Do nothing
  }
}

export const FlightPlanModel = getModelForClass(FlightPlan);

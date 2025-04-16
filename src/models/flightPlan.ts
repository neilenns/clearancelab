import Env from "@/lib/env";
import {
  deleteModelWithClass,
  getModelForClass,
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

// Delete the existing model, if it exists, in development to support hot reloading.
if (Env.NODE_ENV === "development") {
  deleteModelWithClass(FlightPlan);
}

export const FlightPlanModel = getModelForClass(FlightPlan);

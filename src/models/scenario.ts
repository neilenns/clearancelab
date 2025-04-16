import {
  deleteModelWithClass,
  getModelForClass,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { Craft } from "./craft";
import { FlightPlan } from "./flightPlan";
import Env from "@/lib/env";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

export class Scenario {
  @prop({ default: () => nanoid(9) })
  _id!: string;

  @prop() plan!: FlightPlan;

  @prop() craft?: Craft;

  @prop({ type: () => [String] }) problems?: string[];

  @prop() isValid?: boolean;

  // Static methods
  static async findScenarioById(
    this: ReturnModelType<typeof Scenario>,
    _id: string
  ) {
    await connectToDatabase();
    return await this.findOne({ _id }).lean();
  }

  static async findAll(this: ReturnModelType<typeof Scenario>) {
    await connectToDatabase();
    return await this.find({}).lean();
  }
}

if (process.env.NODE_ENV === "development") {
  try {
    mongoose.deleteModel("Scenario");
  } catch {
    // Do nothing
  }
}

export const ScenarioModel = getModelForClass(Scenario);

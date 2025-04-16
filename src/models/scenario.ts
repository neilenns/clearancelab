import {
  type DocumentType,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { Craft } from "./craft";
import { FlightPlan } from "./flightPlan";

export class Scenario {
  @prop({ default: () => nanoid(9) })
  _id!: string;

  @prop() plan!: FlightPlan;

  @prop() craft?: Craft;

  @prop({ type: () => [String] }) problems?: string[];

  @prop() isValid?: boolean;

  // Static method
  static async findScenarioById(this: typeof ScenarioModel, id: string) {
    return await this.findOne({ id });
  }
}

try {
  mongoose.deleteModel("Scenario");
} catch {
  // do nothing, this is fine.
}

export const ScenarioModel = getModelForClass(Scenario);
export type ScenarioDocument = DocumentType<Scenario>;

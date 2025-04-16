import {
  deleteModelWithClass,
  type DocumentType,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { Craft } from "./craft";
import { FlightPlan } from "./flightPlan";
import Env from "@/lib/env";

export class Scenario {
  @prop({ default: () => nanoid(9) })
  _id!: string;

  @prop() plan!: FlightPlan;

  @prop() craft?: Craft;

  @prop({ type: () => [String] }) problems?: string[];

  @prop() isValid?: boolean;

  // Static method
  static async findScenarioById(this: typeof ScenarioModel, _id: string) {
    return await this.findOne({ _id });
  }
}

// Delete the existing model, if it exists, in development to support hot reloading.
if (Env.NODE_ENV === "development") {
  deleteModelWithClass(Scenario);
}

export const ScenarioModel = getModelForClass(Scenario);
export type ScenarioDocument = DocumentType<Scenario>;

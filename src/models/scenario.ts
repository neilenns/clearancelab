import {
  deleteModelWithClass,
  type DocumentType,
  getModelForClass,
  mongoose,
  prop,
  ReturnModelType,
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
  static async findScenarioById(
    this: ReturnModelType<typeof Scenario>,
    _id: string
  ) {
    return await this.findOne({ _id }).lean();
  }
}

try {
  mongoose.deleteModel("Scenario");
} catch {}

export const ScenarioModel = getModelForClass(Scenario);

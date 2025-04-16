import {
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { Craft } from "./craft";
import { FlightPlan } from "./flightPlan";
import { connectToDatabase, deleteModelIfDev } from "@/lib/db";

@modelOptions({
  schemaOptions: {
    collection: "scenarios", // For some reason, in production, without this the collection name was random.
    timestamps: true,
  },
})
export class Scenario {
  @prop({ default: () => nanoid(9) })
  _id!: string;

  @prop({ required: true }) plan!: FlightPlan;

  @prop() craft?: Craft;

  @prop({ type: () => [String] }) problems?: string[];

  @prop() isValid?: boolean;

  // Static methods
  static async findScenarioById(
    this: ReturnModelType<typeof Scenario>,
    _id: string
  ): Promise<Scenario | null> {
    try {
      await connectToDatabase();
      const result = await this.findOne({ _id }).lean();
      return result;
    } catch (error: unknown) {
      console.error(`Error fetching scenario ${_id}:`, error);
      throw error;
    }
  }

  static async findAll(
    this: ReturnModelType<typeof Scenario>
  ): Promise<Scenario[] | null> {
    try {
      await connectToDatabase();
      const result = await this.find({}).lean();
      return result;
    } catch (error: unknown) {
      console.error(`Error fetching scenarios:`, error);
      throw error;
    }
  }
}

deleteModelIfDev("Scenario");
export const ScenarioModel = getModelForClass(Scenario);

import { logger } from "@lib/logger.js";
import { Model, Schema, Types, isValidObjectId, model } from "mongoose";
import {
  AirportConditions,
  AirportConditionsSchema,
} from "./airport-conditions.js";
import "./airport-info.js"; // Import the AirportInfo model to use for population
import { AirportInfoData } from "./airport-info.js";
import { Craft, CraftSchema } from "./craft.js";
import { Explanation, ExplanationSchema } from "./explanations.js";
import { Plan, PlanSchema } from "./plan.js";

// Combined schema data interface
export interface Scenario {
  _id: Types.ObjectId;
  airportConditions: AirportConditions;
  canClear: boolean;
  craft?: Craft;
  depAirportInfo?: AirportInfoData;
  destAirportInfo?: AirportInfoData;
  isValid: boolean;
  plan: Plan;
  explanations: Explanation[];
  views: number;
}

export interface ScenarioSummary {
  _id: Types.ObjectId;
  isValid: boolean;
  canClear: boolean;
  plan: {
    dep?: string;
    dest?: string;
    aid: string;
    rte?: string;
  };
}

// Static method interface
export interface ScenarioModelType extends Model<Scenario> {
  findScenarioById(id: string): Promise<Scenario | null>;
  findScenarios(scenarioIds: string[]): Promise<Scenario[]>;
  findSummary(scenarioIds: string[]): Promise<ScenarioSummary[]>;
  incrementViews(scenarioId: string): Promise<void>;
}

// Define schema
const ScenarioSchema = new Schema<Scenario, ScenarioModelType>(
  {
    airportConditions: { type: AirportConditionsSchema, required: true },
    canClear: { type: Boolean, default: true },
    craft: CraftSchema,
    isValid: { type: Boolean, default: true },
    plan: PlanSchema,
    explanations: {
      type: [ExplanationSchema],
      default: [],
    },
    views: { type: Number, default: 0 },
  },
  {
    collection: "scenarios",
    timestamps: true,
  },
);

// Add a virtual field for departure airport information
ScenarioSchema.virtual("depAirportInfo", {
  ref: "AirportInfo", // The model to use
  localField: "plan.dep", // Field in Scenario to match
  foreignField: "airportCode", // Field in AirportInfo to match
  justOne: true, // Only one airport info per scenario
});

// Add a virtual field for destination airport information
ScenarioSchema.virtual("destAirportInfo", {
  ref: "AirportInfo", // The model to use
  localField: "plan.dest", // Field in Scenario to match
  foreignField: "airportCode", // Field in AirportInfo to match
  justOne: true, // Only one airport info per scenario
});

// Pre-save hook to ensure data consistency.
ScenarioSchema.pre("save", function (next) {
  // Ensure routes don't have "the" in the front, since it's not really part of the route it's part
  // of how clearances are spoken.
  if (this.craft?.route?.toLowerCase().startsWith("the ")) {
    const originalRoute = this.craft.route;
    this.craft.route = this.craft.route.slice(4);
    logger.debug(
      `Normalized route from "${originalRoute}" to "${this.craft.route}"`,
    );
  }

  // Strip periods off some of the CRAFT properties.
  if (this.craft) {
    this.craft.altitude = this.craft.altitude?.replace(/\.$/, "");
    this.craft.clearanceLimit = this.craft.clearanceLimit?.replace(/\.$/, "");
    this.craft.route = this.craft.route?.replace(/\.$/, "");
  }

  next();
});

ScenarioSchema.statics.incrementViews = async function (
  scenarioId: string,
): Promise<void> {
  try {
    if (!isValidObjectId(scenarioId)) {
      throw new Error(`Invalid scenario ID: ${scenarioId}`);
    }

    await this.updateOne({ _id: scenarioId }, { $inc: { views: 1 } });
  } catch (error) {
    logger.error(`Error incrementing views for scenario ${scenarioId}:`, error);
    throw error;
  }
};

ScenarioSchema.statics.findScenarios = async function (
  scenarioIds: string[],
): Promise<Scenario[]> {
  try {
    const query =
      scenarioIds.length > 0
        ? {
            _id: {
              $in: scenarioIds.filter((id) => isValidObjectId(id)),
            },
          }
        : {};

    return await this.find(query)
      .sort({ "plan.dep": 1, "plan.dest": 1, "plan.aid": 1 })
      // I have no idea why this is including all the matched scenarios in a matchedScenarios
      // field. Force exclude them so I can move on to other things.
      .populate("depAirportInfo", "-matchedScenarios") // Populate the departure airport info
      .populate("destAirportInfo", "-matchedScenarios") // Populate the destination airport info
      .lean({ virtuals: true })
      .exec();
  } catch (error) {
    logger.error(`Error finding all scenarios:`, error);
    throw error;
  }
};

ScenarioSchema.statics.findSummary = async function (
  scenarioIds: string[],
): Promise<ScenarioSummary[]> {
  try {
    const query =
      scenarioIds.length > 0
        ? {
            _id: {
              $in: scenarioIds.filter((id) => isValidObjectId(id)),
            },
          }
        : {};

    const results = await this.find(query)
      .select("isValid canClear plan.dep plan.dest plan.aid plan.rte")
      .sort({ "plan.dep": 1, "plan.dest": 1, "plan.aid": 1 })
      .lean()
      .exec();

    return results;
  } catch (error) {
    logger.error(`Error finding scenario summaries:`, error);
    throw error;
  }
};

// Export model
export const ScenarioModel = model<Scenario, ScenarioModelType>(
  "Scenario",
  ScenarioSchema,
);

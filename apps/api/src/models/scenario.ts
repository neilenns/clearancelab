import { Model, Schema, Types, model } from "mongoose";
import { logger } from "../lib/logger.js";
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
}

// Static method interface
export interface ScenarioModelType extends Model<Scenario> {
  findScenarioById(id: string): Promise<Scenario | null>;
  findAll(summary: boolean): Promise<Partial<Scenario>[]>;
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

// Static methods
ScenarioSchema.statics.findScenarioById = function (
  id: string,
): Promise<Scenario | null> {
  try {
    return (
      this.findById(id)
        // I have no idea why this is including all the matched scenarios in a matchedScenarios
        // field. Force exclude them so I can move on to other things.
        .populate("depAirportInfo", "-matchedScenarios") // Populate the departure airport info
        .populate("destAirportInfo", "-matchedScenarios") // Populate the destination airport info
        .lean()
        .exec()
    );
  } catch (error) {
    logger.error(`Error finding scenario with ID ${id}:`, error);
    throw error;
  }
};

ScenarioSchema.statics.findAll = async function (
  summary: boolean,
): Promise<Partial<Scenario>[]> {
  try {
    if (summary) {
      const results = await this.find({})
        .select(
          "isValid canClear plan.dep plan.dest plan.aid createdAt updatedAt",
        )
        .sort({ "plan.dep": 1, "plan.dest": 1, "plan.aid": 1 })
        .lean()
        .exec();

      return results;
    }

    return await this.find({})
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

// Export model
export const ScenarioModel = model<Scenario, ScenarioModelType>(
  "Scenario",
  ScenarioSchema,
);

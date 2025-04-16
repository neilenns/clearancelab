import Env from "@/lib/env";
import {
  deleteModelWithClass,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

export class Craft {
  @prop() telephony?: string;
  @prop() clearanceLimit?: string;
  @prop() route?: string;
  @prop() altitude?: string;
  @prop() frequency?: string;
  @prop() transponder?: string;
  @prop() controllerName?: string;
}

if (process.env.NODE_ENV === "development") {
  try {
    mongoose.deleteModel("Craft");
  } catch {
    // Do nothing
  }
}

export const CraftModel = getModelForClass(Craft);

import { getModelForClass, prop } from "@typegoose/typegoose";
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

try {
  mongoose.deleteModel("Craft");
} catch {
  // do nothing, this is fine.
}

export const CraftModel = getModelForClass(Craft);

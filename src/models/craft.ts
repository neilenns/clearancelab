import Env from "@/lib/env";
import {
  deleteModelWithClass,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";

export class Craft {
  @prop() telephony?: string;
  @prop() clearanceLimit?: string;
  @prop() route?: string;
  @prop() altitude?: string;
  @prop() frequency?: string;
  @prop() transponder?: string;
  @prop() controllerName?: string;
}

// Delete the existing model, if it exists, in development to support hot reloading.
if (Env.NODE_ENV === "development") {
  deleteModelWithClass(Craft);
}

export const CraftModel = getModelForClass(Craft);

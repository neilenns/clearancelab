import mongoose, { HydratedDocument, Schema, Types, model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import "./metar.js";
import { IMetar } from "./metar.js";

export enum VatsimFlightStatus {
  UNKNOWN = "UNKNOWN",
  DEPARTING = "DEPARTING",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
}

export enum VatsimCommunicationMethod {
  VOICE = "VOICE",
  TEXTONLY = "TEXTONLY",
  RECEIVE = "RECEIVE",
}

export interface IVatsimFlightPlan {
  _id: Types.ObjectId;
  cid: number;
  name?: string;
  callsign: string;
  isPrefile: boolean;
  flightRules?: string;
  groundspeed?: number;
  rawAircraftType?: string;
  departure?: string;
  arrival?: string;
  departureTime?: Date;
  EDCT?: Date;
  cruiseAltitude?: number;
  cruiseTas?: number;
  route?: string;
  squawk?: string;
  remarks?: string;
  status: VatsimFlightStatus;
  latitude?: number;
  longitude?: number;
  communicationMethod: VatsimCommunicationMethod;
  coastAt?: Date;
  sentEDCT: boolean;
  revision: number;
  vnasPlanRevision?: number;
  flightPlanRevision: number;
}

export interface IVatsimFlightPlanVirtuals {
  equipmentType?: string;
  equipmentSuffix?: string;
  homeAirport?: string;
  metar?: IMetar;
}

type VatsimFlightPlanHydratedDocument = HydratedDocument<
  IVatsimFlightPlan,
  IVatsimFlightPlanVirtuals
>;

// Static method interface
// There is no way in Mongoose to tell TypeScript about the static methods when creating a model
// so you have to extend the interface with the static methods. See
// https://mongoosejs.com/docs/typescript/statics-and-methods.html.
interface VatsimFlightPlanModelType
  extends mongoose.Model<
    IVatsimFlightPlan,
    unknown,
    unknown,
    IVatsimFlightPlanVirtuals,
    VatsimFlightPlanHydratedDocument
  > {
  findByCallsign(
    callsign: string,
  ): Promise<VatsimFlightPlanHydratedDocument | null>;
}

const VatsimFlightPlanSchema = new Schema<
  IVatsimFlightPlan,
  VatsimFlightPlanModelType,
  unknown,
  unknown,
  IVatsimFlightPlanVirtuals
>(
  {
    cid: { type: Number, required: true },
    name: { type: String },
    callsign: { type: String, required: true },
    isPrefile: { type: Boolean, required: true, default: false },
    flightRules: { type: String },
    groundspeed: { type: Number },
    rawAircraftType: { type: String },
    departure: { type: String, index: true },
    arrival: { type: String },
    departureTime: { type: Date },
    EDCT: { type: Date },
    cruiseAltitude: { type: Number },
    cruiseTas: { type: Number },
    route: { type: String },
    squawk: { type: String },
    remarks: { type: String },
    status: {
      type: String,
      enum: Object.values(VatsimFlightStatus),
      required: true,
      default: VatsimFlightStatus.UNKNOWN,
    },
    latitude: { type: Number },
    longitude: { type: Number },
    communicationMethod: {
      type: String,
      enum: Object.values(VatsimCommunicationMethod),
      required: true,
      default: VatsimCommunicationMethod.VOICE,
    },
    coastAt: { type: Date },
    sentEDCT: { type: Boolean, default: false },
    revision: { type: Number, required: true, default: 0 },
    vnasPlanRevision: { type: Number },
    flightPlanRevision: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      equipmentType: {
        get() {
          if (!this.rawAircraftType) {
            return;
          }

          // Match everything before an optional second slash.
          const parts = this.rawAircraftType.split("/");
          // This is the case for ASA234/L
          if (parts.length == 2) {
            return parts[0];
          }

          // This is the case for H/DAL42/L
          if (parts.length > 2) {
            return parts.slice(0, 2).join("/");
          }

          // This is the case for DAL42
          return this.rawAircraftType;
        },
      },
      equipmentSuffix: {
        get() {
          let rawAircraftType = this.rawAircraftType;

          if (!rawAircraftType) {
            return;
          }

          if (rawAircraftType.startsWith("H/")) {
            rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "H/"
          }

          if (rawAircraftType.startsWith("J/")) {
            rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "J/"
          }

          const codeMatch = /^([A-Z0-9]+)(\/([A-Z]))?$/.exec(rawAircraftType);
          if (codeMatch?.[3]) {
            return codeMatch[3];
          }

          return;
        },
      },
      homeAirport: {
        get() {
          const parts = this.name?.split(" ");

          if (!parts || parts.length < 2) {
            return;
          }

          const candidate = parts.at(-1)?.toUpperCase();

          if (!candidate) {
            return;
          }

          return /^[A-Z]{4}$/.test(candidate) ? candidate : undefined;
        },
      },
    },
  },
);

VatsimFlightPlanSchema.plugin(mongooseLeanVirtuals);

VatsimFlightPlanSchema.virtual("metar", {
  ref: "Metar", // The model to use
  localField: "departure", // Field in Scenario to match
  foreignField: "icao", // Field in Metar to match
  justOne: true, // Only one metar per scenario
});

VatsimFlightPlanSchema.statics.findByCallsign = function (callsign) {
  return this.findOne({ callsign })
    .populate("metar")
    .lean<VatsimFlightPlanHydratedDocument>({
      virtuals: true,
    });
};

export const VatsimFlightPlanModel = model<
  IVatsimFlightPlan,
  VatsimFlightPlanModelType,
  unknown
>("vatsimflightplans", VatsimFlightPlanSchema);

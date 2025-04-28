import mongoose, { Schema, Model, Types } from "mongoose";

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

export interface VatsimFlightPlan {
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
  equipmentType?: string; // Virtual field
  equipmentSuffix?: string; // Virtual field
}

// Static method interface
export interface VatsimFlightPlanModelType extends Model<VatsimFlightPlan> {
  findByCallsign(callsign: string): Promise<VatsimFlightPlan | null>;
}

const VatsimFlightPlanSchema = new Schema<
  VatsimFlightPlan,
  VatsimFlightPlanModelType
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
  }
);

VatsimFlightPlanSchema.virtual("equipmentType").get(function () {
  if (this.rawAircraftType == null) {
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
});

VatsimFlightPlanSchema.virtual("equipmentSuffix").get(function () {
  let rawAircraftType = this.rawAircraftType;

  if (rawAircraftType == null) {
    return;
  }

  if (rawAircraftType.startsWith("H/")) {
    rawAircraftType = rawAircraftType.substring(2); // Strip off the leading "H/"
  }

  if (rawAircraftType.startsWith("J/")) {
    rawAircraftType = rawAircraftType.substring(2); // Strip off the leading "J/"
  }

  const codeMatch = /^([A-Z0-9]+)(\/([A-Z]))?$/.exec(rawAircraftType);
  if (codeMatch != null && codeMatch.length > 0) {
    if (codeMatch.length > 2 && codeMatch[3].length > 0) {
      return codeMatch[3];
    }
  }

  return null;
});

VatsimFlightPlanSchema.statics.findByCallsign = function (callsign) {
  return this.findOne({ callsign });
};

export const VatsimFlightPlanModel = mongoose.model<
  VatsimFlightPlan,
  VatsimFlightPlanModelType
>("vatsimflightplan", VatsimFlightPlanSchema);

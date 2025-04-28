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

export interface VastimFlightPlan {
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
}

// Static method interface
export interface VastimFlightPlanModelType extends Model<VastimFlightPlan> {
  findByCallsign(callsign: string): Promise<VastimFlightPlan | null>;
}

const VatsimFlightPlanSchema = new Schema<
  VastimFlightPlan,
  VastimFlightPlanModelType
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

VatsimFlightPlanSchema.statics.findByCallsign = function (callsign) {
  return this.findOne({ callsign });
};

export const VatsimFlightPlanModel = mongoose.model<
  VastimFlightPlan,
  VastimFlightPlanModelType
>("vatsimflightplan", VatsimFlightPlanSchema);

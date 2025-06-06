import { VatsimFlightPlan } from "./vatsim-flight-plan";

export interface VatsimPilot {
  cid: number;
  name: string;
  callsign: string;
  server: string;
  pilot_rating: number;
  military_rating: number;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  depTime: string;
  transponder: string;
  heading: number;
  qnh_i_hg: number;
  qnh_mb: number;
  flight_plan?: VatsimFlightPlan;
  logon_time: string;
  last_updated: string;
  isPrefile: boolean;
}

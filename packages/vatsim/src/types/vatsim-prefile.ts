import { VatsimFlightPlan } from "./vatsim-flight-plan";

export interface VatsimPrefile {
  cid: number;
  name: string;
  callsign: string;
  flight_plan: VatsimFlightPlan;
  last_updated: string;
}

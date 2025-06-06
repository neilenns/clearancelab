export interface VatsimFlightPlan {
  flight_rules: string;
  name: string;
  aircraft: string;
  aircraft_faa: string;
  aircraft_short: string;
  departure: string;
  arrival: string;
  alternate: string;
  cruise_tas: string; // Comes in as a string, but is a number
  altitude: string;
  deptime: string;
  enroute_time: string;
  fuel_time: string;
  remarks: string;
  route: string;
  revision_id: number;
  assigned_transponder: string;
}

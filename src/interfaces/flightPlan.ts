export interface FlightPlan {
  pilotName?: string;
  aid: string; // Callsign
  vatsimId?: number; // VATSIM ID
  cid?: number; // Enroute ID
  typ: string;
  eq: string;
  bcn?: number;
  dep: string;
  dest: string;
  spd?: number;
  alt: number;
  rte: string;
  rmk?: string;
  raw?: string;
  airportConditions?: string;
}

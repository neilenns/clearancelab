import { Craft } from "@/interfaces/craft";

export interface FlightPlan {
  id: string;
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
  isValid?: boolean;
  craft?: Craft;
}

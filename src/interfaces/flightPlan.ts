import { Craft } from "@/interfaces/craft";

export interface FlightPlan {
  id: number;
  pilotName?: string;
  aid: string;
  cid?: number;
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

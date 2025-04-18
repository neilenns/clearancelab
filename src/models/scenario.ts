import { ProblemLevel } from "@/interfaces/level";
import { AirportInfo } from "./airportInfo";

export interface ScenarioData {
  _id: string;
  plan: {
    pilotName?: string;
    aid: string;
    vatsimId?: number;
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
    airportConditions?: string;
  };
  craft?: {
    altitude?: string;
    clearanceLimit?: string;
    controllerName?: string;
    frequency?: string;
    route?: string;
    telephony?: string;
    transponder?: string;
  };
  depAirportInfo?: AirportInfo;
  destAirportInfo?: AirportInfo;
  problems: ProblemData[];
  isValid: boolean;
  canClear: boolean;
}

export interface ProblemData {
  level: Exclude<ProblemLevel, "ok">;
  issue: string;
  solution: string;
}

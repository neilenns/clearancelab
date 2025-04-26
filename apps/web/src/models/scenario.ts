import { ProblemLevel } from "@/interfaces/level";
import { AirportInfo } from "./airportInfo";

export interface ScenarioData {
  _id?: string;
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
    alt: string;
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
  };
  depAirportInfo?: AirportInfo;
  destAirportInfo?: AirportInfo;
  problems?: ProblemData[];
  isValid: boolean;
  canClear: boolean;
}

export interface ProblemData {
  // This is kinda a hack, using ProblemLevel as both the different display types for
  // the callout box and the values from the database. The database doesn't return "ok".
  level: Exclude<ProblemLevel, "ok">;
  issue: string;
  solution: string;
}

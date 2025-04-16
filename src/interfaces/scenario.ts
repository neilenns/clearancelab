import { Craft } from "./craft";
import { FlightPlan } from "./flightPlan";

export default interface Scenario {
  id: string;
  plan: FlightPlan;
  craft?: Craft;
  problems?: string[];
  isValid?: boolean;
}

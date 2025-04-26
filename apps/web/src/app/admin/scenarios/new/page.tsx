import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import {
  getRandomBcn,
  getRandomCallsign,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { ScenarioInput } from "@workspace/validators";

const defaultValues: ScenarioInput = {
  plan: {
    aid: getRandomCallsign(),
    bcn: getRandomBcn(),
    cid: getRandomCid(),
    pilotName: getRandomName(),
    vatsimId: getRandomVatsimId(),
    dep: "",
    dest: "",
    typ: "",
    eq: "",
    rte: "",
    rmk: "",
    raw: "",
    spd: 0,
    alt: 0,
  },
  isValid: true,
  canClear: true,
  craft: {
    clearanceLimit: "",
    route: "",
    altitude: "",
    frequency: "",
    transponder: "",
  },
  airportConditions: "",
};

export default function NewScenarioPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Scenario</h1>
      <ScenarioForm values={defaultValues} />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRandomBcn,
  getRandomCallsign,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { Scenario, ScenarioSchema } from "@workspace/validators";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { onSubmitScenario } from "./actions";
import { PlanSection } from "./plan-section";

const defaultValues = {
  plan: {
    aid: getRandomCallsign(),
    cid: getRandomCid(),
    bcn: getRandomBcn(),
    vatsimId: getRandomVatsimId(),
    pilotName: getRandomName(),
    airportConditions: "",
    alt: "",
    dep: "",
    dest: "",
    eq: "",
    raw: "",
    rmk: "",
    rte: "",
    typ: "",
  },
  isValid: true,
} as Scenario;

export function ScenarioForm() {
  const form = useForm<Scenario>({
    resolver: zodResolver(ScenarioSchema),
    mode: "onChange",
    defaultValues,
  });

  const [formState, submitScenarioAction, isPending] = useActionState(
    onSubmitScenario,
    {
      success: false,
    }
  );

  console.log("fields returned: ", { ...(formState.fields ?? {}) });

  return (
    <Form {...form}>
      <form
        aria-label="Scenario details form"
        action={submitScenarioAction}
        className="space-y-8"
      >
        <PlanSection />
        {!isPending ? (
          <Button className="w-[125px]" type="submit">
            Save
          </Button>
        ) : (
          <Button
            aria-busy="true"
            aria-label="Saving scenario"
            className="w-[125px]"
            disabled
          >
            <Loader2 className="animate-spin" aria-hidden="true" />
            Save
          </Button>
        )}
      </form>
    </Form>
  );
}

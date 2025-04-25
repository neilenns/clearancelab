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
import { Plan, PlanSchema } from "@workspace/validators/plan";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { onSubmitPlan } from "./actions";
import { PlanSection } from "./plan-section";

const defaultValues = {
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
} as Plan;

export function ScenarioForm() {
  const form = useForm<Plan>({
    resolver: zodResolver(PlanSchema),
    mode: "onChange",
    defaultValues,
  });

  const [formState, submitPlanAction, isPending] = useActionState(
    onSubmitPlan,
    {
      success: false,
    }
  );

  console.log("fields returned: ", { ...(formState.fields ?? {}) });

  return (
    <Form {...form}>
      <form action={submitPlanAction} className="space-y-8">
        <PlanSection />
        {!isPending ? (
          <Button className="w-[125px]" type="submit">
            Save
          </Button>
        ) : (
          <Button className="w-[125px]" disabled>
            <Loader2 className="animate-spin" />
            Save
          </Button>
        )}
      </form>
    </Form>
  );
}

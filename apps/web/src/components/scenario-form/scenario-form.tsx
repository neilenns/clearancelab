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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlanSection } from "./plan-section";
import { ScenarioInput, ScenarioSchema } from "@workspace/validators";
import { ScenarioOverview } from "./scenario-overview";

export function ScenarioForm() {
  const form = useForm<ScenarioInput>({
    resolver: zodResolver(ScenarioSchema),
    mode: "onChange",
    defaultValues: {
      plan: {
        aid: getRandomCallsign(),
        bcn: getRandomBcn(),
        cid: getRandomCid(),
        pilotName: getRandomName(),
        vatsimId: getRandomVatsimId(),
      },
      isValid: true,
      canClear: true,
    },
  });

  function onSubmit(values: ScenarioInput) {
    toast.success(`Saved ${values.plan.aid}!`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <PlanSection />
        <ScenarioOverview />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

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
import { CraftSection } from "./craft-section";

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
    },
  });

  function onSubmit(_values: ScenarioInput) {
    toast.success(`Scenario saved`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <ScenarioOverview />
        <PlanSection />
        <CraftSection />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

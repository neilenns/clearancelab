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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlanSection } from "./plan-section";

export function ScenarioForm() {
  const form = useForm<Plan>({
    resolver: zodResolver(PlanSchema),
    mode: "onChange",
    defaultValues: {
      aid: getRandomCallsign(),
      cid: getRandomCid(),
      bcn: getRandomBcn(),
      vatsimId: getRandomVatsimId(),
      pilotName: getRandomName(),
    },
  });

  function onSubmit(values: Plan) {
    toast.success(`Saved ${values.pilotName ?? ""}!`);
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

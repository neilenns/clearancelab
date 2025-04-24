"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan, planSchema } from "@workspace/validators/plan";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlanSection } from "./plan-section";

export function ScenarioForm() {
  const form = useForm<Plan>({
    resolver: zodResolver(planSchema),
    mode: "onChange",
    defaultValues: {
      aid: "ASA17",
      cid: 295,
      bcn: 6660,
      typ: "B739",
      eq: "L",
      dep: "KPDX",
      dest: "KLAS",
      spd: 225,
      alt: "350",
      vatsimId: 1531877,
      pilotName: "Quinn",
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
        <PlanSection form={form} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

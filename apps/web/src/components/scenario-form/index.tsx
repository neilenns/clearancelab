"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan, planSchema } from "@workspace/validators/plan";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PlanSection } from "./plan-section";

export function ScenarioForm() {
  const form = useForm<Plan>({
    resolver: zodResolver(planSchema),
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

  function onSubmit(values: z.infer<typeof planSchema>) {
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
        <PlanSection control={form.control} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

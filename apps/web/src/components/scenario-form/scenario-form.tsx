"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlanSection } from "./plan-section";
import { ScenarioInput, ScenarioSchema } from "@workspace/validators";
import { ScenarioOverview } from "./scenario-overview";
import { CraftSection } from "./craft-section";
import { useActionState } from "react";
import { addScenario } from "./actions";

export interface ScenarioFormState {
  errors: Record<string, { message: string }>;
  values: ScenarioInput;
}

export const ScenarioForm = ({ values }: { values: ScenarioInput }) => {
  const [state, formAction, isPending] = useActionState(addScenario, {
    values,
    errors: {},
  });

  const form = useForm<ScenarioInput>({
    resolver: zodResolver(ScenarioSchema),
    errors: state.errors,
    mode: "onBlur",
    values: state.values,
  });

  return (
    <Form {...form}>
      {
        // This extra form element is required to get the action attribute. Shadcn's Form
        // component does not expose it.
      }
      <form action={formAction} className="space-y-4">
        <ScenarioOverview />
        <PlanSection />
        <CraftSection />

        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};

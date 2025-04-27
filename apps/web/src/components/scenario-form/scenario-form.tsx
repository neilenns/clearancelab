"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlanSection } from "./plan-section";
import { ScenarioInput, ScenarioSchema } from "@workspace/validators";
import { ScenarioOverview } from "./scenario-overview";
import { CraftSection } from "./craft-section";
import { useActionState, useEffect } from "react";
import { onSubmitScenario } from "./actions";

export const ScenarioForm = ({ values }: { values: ScenarioInput }) => {
  const [formState, formAction, isPending] = useActionState(onSubmitScenario, {
    success: false,
  });

  const form = useForm<ScenarioInput>({
    resolver: zodResolver(ScenarioSchema),
    mode: "onTouched",
    values,
  });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = form;

  console.log(formState);
  console.log("fields returned: ", { ...(formState.fields ?? {}) });

  // Reset the form when the submit is successful.
  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

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

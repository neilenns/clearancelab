"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRandomScenario } from "@workspace/plantools";
import { ScenarioInput, ScenarioSchema } from "@workspace/validators";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { onSubmitScenario } from "./actions";
import { AirportConditionsSection } from "./airport-conditions-section";
import { CraftSection } from "./craft-section";
import { ExplanationsSection } from "./explanations-section";
import { PlanSection } from "./plan-section";

export const ScenarioForm = ({ defaultValues }: { defaultValues: ScenarioInput }) => {
  const isEditMode = Boolean(defaultValues._id);
  const initialFormState = { success: false, message: "", hasSubmitted: false, id: undefined };
  const [formState, formAction, isPending] = useActionState(onSubmitScenario, initialFormState);

  const form = useForm<ScenarioInput>({
    resolver: zodResolver(ScenarioSchema),
    mode: "onTouched",
    defaultValues,
  });

  const { reset } = form;

  // Reset the form when the submit is successful.
  useEffect(() => {
    if (!formState?.hasSubmitted) {
      return;
    }

    if (!formState.success) {
      toast.error(formState.message);
      return;
    }

    const message = (
      <div>
        Scenario {isEditMode ? "updated" : "saved"}!
        {formState.id && (
          <>
            &nbsp;
            <Link href={`/lab/${formState.id}`} className="text-blue-500 hover:underline">
              View
            </Link>
          </>
        )}
      </div>
    );

    toast.success(message);

    // This seems really wrong to just directly set, but it seems to work.
    formState.hasSubmitted = false;

    // Don't reset with new data if it was an edit of an existing scenario.

    if (!isEditMode) {
      reset(getRandomScenario());
    }
  }, [reset, formAction, formState, isEditMode]);

  return (
    <Form {...form}>
      {
        // This extra form element is required to get the action attribute. Shadcn's Form
        // component does not expose it.
      }
      <form action={formAction} autoComplete="off" aria-label="Scenario creation form">
        <fieldset disabled={isPending} className="space-y-4">
          <input type="hidden" name="_id" value={form.watch("_id")?.toString()} />

          <PlanSection isEditMode={isEditMode} />
          <AirportConditionsSection />
          <ExplanationsSection />
          <CraftSection />

          {isPending ? (
            <Button disabled className="w-[120px]">
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span className="sr-only">{isEditMode ? "Updating..." : "Saving..."}</span>
              {isEditMode ? "Updating..." : "Saving..."}
            </Button>
          ) : (
            <Button type="submit" disabled={isPending} className="w-[120px]">
              {isEditMode ? "Update" : "Save"}
            </Button>
          )}
        </fieldset>
      </form>
    </Form>
  );
};

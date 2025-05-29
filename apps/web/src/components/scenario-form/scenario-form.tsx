"use client";

import { addOrUpdateScenario } from "@/api/scenarios/add-or-update-scenario";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Scenario } from "@/db/scenarios";
import { getRandomScenario } from "@workspace/plantools";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AirportConditionsSection } from "./airport-conditions-section";
import { CraftSection } from "./craft-section";
import { ExplanationsSection } from "./explanations-section";
import { PlanSection } from "./plan-section";
export const ScenarioForm = ({
  defaultValues,
}: {
  defaultValues: Scenario;
}) => {
  const isEditMode = Boolean(defaultValues.id);
  const initialFormState = {
    success: false,
    message: "",
    hasSubmitted: false,
    id: undefined,
  };

  const [formState, formAction, isPending] = useActionState(
    addOrUpdateScenario,
    initialFormState,
  );

  const form = useForm<Scenario>({
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
            <Link
              href={`/lab/${formState.id}`}
              className="text-blue-500 hover:underline"
              aria-label="View scenario details"
            >
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
      <form
        action={formAction}
        autoComplete="off"
        aria-label="Scenario creation form"
      >
        <fieldset disabled={isPending} className="space-y-4">
          <input type="hidden" name="id" value={form.watch("id")?.toString()} />

          <PlanSection isEditMode={isEditMode} />
          <AirportConditionsSection />
          <ExplanationsSection />
          <CraftSection />

          {isPending ? (
            <Button disabled className="w-[120px]">
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span className="sr-only">
                {isEditMode ? "Updating..." : "Saving..."}
              </span>
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

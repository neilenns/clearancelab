import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scenario } from "@/db/scenarios";
import dynamic from "next/dynamic";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ExplanationsDndListSkeleton } from "./explanations-dnd-list-skeleton";

// This is required to avoid SSR errors from using the drag-and-drop library
const ExplanationsDndList = dynamic(
  () =>
    import("./explanations-dnd-list").then(
      (module_) => module_.ExplanationsDndList,
    ),
  { ssr: false, loading: () => <ExplanationsDndListSkeleton /> },
);

export function ExplanationsSection() {
  const { control } = useFormContext<Scenario>();

  const { fields, append, remove, move } = useFieldArray({
    name: "explanations",
    control,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle id="explanations-section-title">Explanations</CardTitle>
        <CardDescription>
          A list of explanations for the filed flight plan, describing any
          issues or offering tips to the student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fieldset
          className="space-y-6"
          aria-describedby="explanations-section-title"
        >
          {fields.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              Tap the button below to add an explanation
            </div>
          ) : (
            <div className="flex items-end space-x-4 mb-4">
              <div className="w-6"></div>
              <div className="w-28">
                <div className="text-sm font-semibold">Level</div>
                <div className="text-muted-foreground text-sm">
                  <span className="invisible" aria-hidden="true">
                    Spacer
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Headline</div>
                <div className="text-muted-foreground text-sm">
                  Headline for the explanation box.
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Description</div>
                <div className="text-muted-foreground text-sm">
                  Detailed description of the tip or issue.
                </div>
              </div>
              <div className="w-10">
                <div className="text-sm font-semibold">Delete</div>
                <div className="text-muted-foreground text-sm">
                  <span className="invisible" aria-hidden="true">
                    Spacer
                  </span>
                </div>
              </div>
            </div>
          )}

          <ExplanationsDndList
            fields={fields}
            control={control}
            remove={remove}
            move={move}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              append({
                id: 1, // The actual value here doesn't matter, the database will set it when this is saved.
                scenarioId: 1, // The actual value here doesn't matter, the backend will set it when this is saved.
                order: 1, // The actual value here doesn't matter, the backend will set it when this is saved.
                headline: "",
                level: "error",
                description: "",
              });
            }}
          >
            Add explanation
          </Button>
        </fieldset>
      </CardContent>
    </Card>
  );
}

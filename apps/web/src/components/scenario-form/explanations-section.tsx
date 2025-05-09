"use client"; // Required to avoid SSR errors from using the drag-and-drop library
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ScenarioInput } from "@workspace/validators";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Loading } from "../loading";
import { ExplanationFieldRow } from "./explanation-field-row";

export function ExplanationsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { control } = useFormContext<ScenarioInput>();

  const { fields, append, remove, move } = useFieldArray({
    name: "explanations",
    control,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Only do the move and re-render if the index has changed
    const { index: from } = result.source;
    const { index: to } = result.destination;

    if (from !== to) {
      move(from, to);
    }
  };

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
        {mounted ? (
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

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="explanations">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <ExplanationFieldRow
                            index={index}
                            control={control}
                            remove={remove}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                append({ headline: "", level: "error", description: "" });
              }}
            >
              Add explanation
            </Button>
          </fieldset>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  );
}

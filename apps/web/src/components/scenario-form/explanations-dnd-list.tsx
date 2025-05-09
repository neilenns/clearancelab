"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ScenarioInput } from "@workspace/validators";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from "react-hook-form";
import { ExplanationFieldRow } from "./explanation-field-row";

interface ExplanationsDndListProperties {
  fields: FieldArrayWithId<ScenarioInput, "explanations", "id">[];
  control: Control<ScenarioInput>;
  remove: UseFieldArrayRemove;
  move: (from: number, to: number) => void;
}

export function ExplanationsDndList({
  fields,
  control,
  remove,
  move,
}: ExplanationsDndListProperties) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { index: from } = result.source;
    const { index: to } = result.destination;
    if (from !== to) {
      move(from, to);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="explanations">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
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
  );
}

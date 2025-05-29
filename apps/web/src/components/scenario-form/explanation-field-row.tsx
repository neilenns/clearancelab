import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Scenario } from "@/db/scenarios";
import { DraggableProvided } from "@hello-pangea/dnd";
import { GripVertical, Trash2 } from "lucide-react";
import { Control, UseFieldArrayRemove } from "react-hook-form";

export interface ExplanationFieldRowProperties {
  index: number;
  control: Control<Scenario>;
  remove: UseFieldArrayRemove;
  provided: DraggableProvided;
}

export const ExplanationFieldRow = ({
  index,
  control,
  remove,
  provided,
}: ExplanationFieldRowProperties) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="flex flex-col space-y-4 mb-4"
    >
      <div className="flex items-start space-x-4">
        <div
          className="w-6 flex items-center justify-center h-[36px]"
          aria-label="Drag to reorder explanation"
          {...provided.dragHandleProps}
        >
          <GripVertical className="h-4 w-4" />
        </div>
        <div className="w-28">
          <FormField
            control={control}
            name={`explanations.${index}.id`}
            render={({ field }) => (
              <input
                type="hidden"
                id={`explanation-id-${index.toString()}`}
                name={field.name}
                value={field.value}
                aria-hidden="true"
              />
            )}
          />
          <FormField
            control={control}
            name={`explanations.${index}.scenarioId`}
            render={({ field }) => (
              <input
                type="hidden"
                id={`explanation-scenarioId-${index.toString()}`}
                name={field.name}
                value={field.value}
                aria-hidden="true"
              />
            )}
          />
          <FormField
            control={control}
            name={`explanations.${index}.level`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`explanation-level-${index.toString()}`}
                  className="sr-only"
                >
                  Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <div>
                      <input
                        type="hidden"
                        aria-hidden="true"
                        id={`explanation-level-${index.toString()}`}
                        name={field.name}
                        value={field.value}
                      />
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tip">Tip</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={control}
            name={`explanations.${index}.headline`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Headline</FormLabel>
                <FormDescription className="sr-only">
                  Headline for the explanation box.
                </FormDescription>
                <FormControl>
                  <Input
                    id={`explanation-headline-${index.toString()}`}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={control}
            name={`explanations.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormDescription className="sr-only">
                  Detailed description of the tip or issue.
                </FormDescription>
                <FormControl>
                  <Textarea
                    id={`explanation-description-${index.toString()}`}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormItem className="flex flex-col items-center">
            <FormLabel className="sr-only">Delete</FormLabel>
            <FormDescription className="sr-only">
              <span className="invisible" aria-hidden="true">
                Spacer
              </span>
            </FormDescription>
            <FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  remove(index);
                }}
                aria-label="Delete explanation"
              >
                <Trash2 />
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </div>
    </div>
  );
};

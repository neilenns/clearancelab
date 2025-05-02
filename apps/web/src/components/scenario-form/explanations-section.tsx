import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScenarioInput } from "@workspace/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function ExplanationsSection() {
  const { control } = useFormContext<ScenarioInput>();
  const isValid = useWatch({ control, name: "isValid" });

  const { fields, append, remove } = useFieldArray({
    name: "explanations",
    control,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problems</CardTitle>
        <CardDescription>
          {!isValid ? (
            <span>
              The list of problems with the filed flight plan, and the
              associated solutions.
            </span>
          ) : (
            <span>
              To provide problems details, turn off the flight plan{" "}
              <b>Is valid?</b> option.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fieldset
          disabled={isValid}
          className="space-y-4"
          aria-describedby="explanations-section-description"
        >
          <legend id="explanations-section-description" className="sr-only">
            Explanations about the flight plan and issuing clearance
          </legend>
          <div className="grid grid-cols-[auto_1fr_1fr_auto] items-start mb-4 gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="contents">
                <div>
                  <FormField
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    name={`explanations.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor={`explanation-level-${index.toString()}`}
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Level
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          <span className="invisible" aria-hidden="true">
                            Spacer
                          </span>
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <div>
                              <input
                                type="hidden"
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
                <div>
                  <FormField
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    name={`explanations.${index}.headline`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Headline
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Headline for the explanation box.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    name={`explanations.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Description
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Detailed description of the tip or issue.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Delete
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
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
                        <span className="sr-only">Delete explanation</span>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              append({ headline: "", level: "error", description: "" });
            }}
          >
            Add problem
          </Button>
        </fieldset>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScenarioInput } from "@workspace/validators";
import { Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ExplanationsSection() {
  const { control } = useFormContext<ScenarioInput>();

  const { fields, append, remove } = useFieldArray({
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
          <div className="flex items-end space-x-4 mb-4">
            <div className="w-28">
              <FormLabel>Level</FormLabel>
              <FormDescription>
                <span className="invisible" aria-hidden="true">
                  Spacer
                </span>
              </FormDescription>
            </div>
            <div className="flex-1">
              <FormLabel>Headline</FormLabel>
              <FormDescription>
                Headline for the explanation box.
              </FormDescription>
            </div>
            <div className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Detailed description of the tip or issue.
              </FormDescription>
            </div>
            <div className="w-10">
              <FormLabel>Delete</FormLabel>
              <FormDescription>
                <span className="invisible" aria-hidden="true">
                  Spacer
                </span>
              </FormDescription>
            </div>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-28">
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
                        <FormDescription className="sr-only">
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
                                aria-hidden="true"
                                id={`explanation-level-${index.toString()}`}
                                name={field.name}
                                value={field.value}
                              />
                              <SelectTrigger>
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                        <span className="sr-only">Delete explanation</span>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </div>
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              Tap the button below to add an explanation
            </div>
          )}
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
      </CardContent>
    </Card>
  );
}

import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function ProblemsSection() {
  const { control } = useFormContext<ScenarioInput>();

  const { fields, append } = useFieldArray({
    name: "problems",
    control,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problems</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 items-start mb-4">
          {fields.map((field, index) => (
            <div key={field.id} className="contents">
              <div className="col-span-1">
                <FormField
                  control={control}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  name={`problems.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Level
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Severity of the issue.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4">
                <FormField
                  control={control}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  name={`problems.${index}.issue`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Issue
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Description of the issue.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4">
                <FormField
                  control={control}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  name={`problems.${index}.solution`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Solution
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Steps to resolve the issue with the pilot.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            append({ issue: "", level: "error", solution: "" });
          }}
        >
          Add problem
        </Button>
      </CardContent>
    </Card>
  );
}

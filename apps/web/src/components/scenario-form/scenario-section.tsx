import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "../ui/form";
import { Scenario } from "@workspace/validators";

export function ScenarioSection() {
  const { control } = useFormContext<Scenario>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario info</CardTitle>
        <CardDescription>
          Enter additional background on the scenario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="isValid"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel id="valid-scenario-label">Valid scenario</FormLabel>
                <FormDescription>
                  Indicates whether this scenario is valid and can be used for
                  training.
                </FormDescription>{" "}
              </div>
              <FormControl>
                <Switch
                  aria-labelledby="valid-scenario-label"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
            <FormField
              control={control}
              name="isValid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel id="valid-scenario-label">
                      Valid scenario
                    </FormLabel>
                    <FormDescription>
                      Scenario is fully valid with no errors.
                    </FormDescription>
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
          </div>

          <div className="col-span-4">
            <FormField
              control={control}
              name="canClear"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel id="valid-scenario-label">Can clear</FormLabel>
                    <FormDescription>
                      Clearance can be issued, even if there are errors in the
                      flight plan.
                    </FormDescription>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

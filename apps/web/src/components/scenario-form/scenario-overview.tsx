import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScenarioInput } from "@workspace/validators";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function ScenarioOverview() {
  const { control } = useFormContext<ScenarioInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-3">
            <FormField
              control={control}
              name="isValid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight plan valid?</FormLabel>
                  <FormDescription>
                    Is the flight plan completely correct with no errors?
                  </FormDescription>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={control}
              name="canClear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Can clear?</FormLabel>
                  <FormDescription>
                    Can the flight plan be cleared, even with errors?
                  </FormDescription>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-8">
            <FormField
              control={control}
              name="airportConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Airport conditions</FormLabel>
                  <FormDescription>
                    Additional information about the airport, relevant to the
                    scenario. For example, airport flow, altimeter, and whether
                    departure is online.
                  </FormDescription>
                  <FormControl>
                    <Input
                      id="airportConditions"
                      placeholder="West flow, altimeter 29.92, departure 124.350."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

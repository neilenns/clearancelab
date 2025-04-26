import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "@radix-ui/react-switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "../ui/form";
import { Scenario } from "@workspace/validators";

export function PlanSection() {
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
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
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

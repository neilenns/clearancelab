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
import { ScenarioInput } from "@workspace/validators";
import { useFormContext, useWatch } from "react-hook-form";
import { NumberInput } from "../number-input";

export function CraftSection() {
  const { control } = useFormContext<ScenarioInput>();
  const departureOnline = useWatch({
    control,
    name: "airportConditions.departureOnline",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRAFT details</CardTitle>
        <CardDescription>
          Provides custom values for the CRAFT clearance when shown to the
          student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fieldset
          className="space-y-4"
          aria-describedby="craft-section-description"
        >
          <legend id="craft-section-description" className="sr-only">
            CRAFT clearance details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 items-start mb-4">
            <div>
              <FormField
                control={control}
                name="craft.controllerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Controller name</FormLabel>
                    <FormDescription>
                      The way to say the controller&apos;s name.
                    </FormDescription>
                    <FormControl>
                      <Input
                        id="controllerName"
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
              <FormField
                control={control}
                name="craft.telephony"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephony</FormLabel>
                    <FormDescription>
                      The way to say the flight&apos;s callsign.
                    </FormDescription>
                    <FormControl>
                      <Input
                        id="telephony"
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
              <FormField
                control={control}
                name="craft.clearanceLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clearance limit</FormLabel>
                    <FormDescription>
                      Overrides the destination airport as the clearance limit.
                    </FormDescription>
                    <FormControl>
                      <Input
                        id="clearanceLimit"
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
              <FormField
                control={control}
                name="craft.route"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <FormDescription>
                      Route for the clearance. &quot;via the&quot; is not
                      required.
                    </FormDescription>
                    <FormControl>
                      <Input id="route" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="craft.altitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altitude</FormLabel>
                    <FormDescription>
                      Initial climb altitude for the clearance.
                    </FormDescription>
                    <FormControl>
                      <Input
                        id="altitude"
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
              <FormField
                control={control}
                name="craft.frequency"
                disabled={!departureOnline}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormDescription>
                      {departureOnline
                        ? "Frequency for the departure controller."
                        : "Enable departure online to set a departure frequency."}
                    </FormDescription>
                    <FormControl>
                      <NumberInput
                        className="w-30"
                        id="frequency"
                        fixedDecimalScale={true}
                        decimalScale={3}
                        aria-label="Departure frequency"
                        {...field}
                      ></NumberInput>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </fieldset>
      </CardContent>
    </Card>
  );
}

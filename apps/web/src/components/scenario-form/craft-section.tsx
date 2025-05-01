import { useFormContext, useWatch } from "react-hook-form";
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
import { ScenarioInput } from "@workspace/validators";
import { Input } from "@/components/ui/input";

export function CraftSection() {
  const { control } = useFormContext<ScenarioInput>();
  const canClear = useWatch({ control, name: "canClear" });

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRAFT details</CardTitle>
        <CardDescription>
          {canClear ? (
            <span>
              Provides custom values for the CRAFT clearance when shown to the
              student.
            </span>
          ) : (
            <span>
              To provide CRAFT details, turn on the flight plan{" "}
              <b>Can clear?</b> option.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fieldset disabled={!canClear} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 items-start mb-4">
            <div>
              <FormField
                control={control}
                name="craft.clearanceLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clearance limit</FormLabel>
                    <FormDescription>
                      Overrides the default clearance limit.
                    </FormDescription>
                    <FormControl>
                      <Input
                        id="clearanceLimit"
                        placeholder="Battleground VOR"
                        {...field}
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
                      <Input
                        id="route"
                        placeholder="Portland 2 departure, then as filed"
                        {...field}
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
                        placeholder="maintain 6,000"
                        {...field}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormDescription>
                      Departure frequency for the departure controller.
                    </FormDescription>
                    <FormControl>
                      <Input id="frequency" placeholder="offline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="craft.transponder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transponder</FormLabel>
                    <FormDescription>
                      Custom transponder code for the clearance.
                    </FormDescription>
                    <FormControl>
                      <Input id="transponder" placeholder="1234" {...field} />
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

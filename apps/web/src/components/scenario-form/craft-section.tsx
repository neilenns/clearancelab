import { useFormContext } from "react-hook-form";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
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
          <div className="col-span-4">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
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
          <div className="col-span-4">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 items-start mb-4">
          <div className="col-span-4">
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
      </CardContent>
    </Card>
  );
}

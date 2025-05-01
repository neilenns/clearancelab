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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScenarioInput } from "@workspace/validators";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ReactFormSwitch } from "@/components/ui/react-form-switch";
import { getRandomAltimeter } from "@workspace/plantools";
import { RefreshCwIcon } from "lucide-react";

export function AirportConditionsSection() {
  const { control } = useFormContext<ScenarioInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Airport conditions</CardTitle>
        <CardDescription>
          Provides additional context required to evaluate and clear the flight
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fieldset
          className="flex gap-2"
          aria-describedby="airport-section-description"
        >
          <legend id="airport-section-description" className="sr-only">
            Airport conditions
          </legend>
          <div>
            <FormField
              control={control}
              name={"airportConditions.flow"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flow</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <div>
                        <input
                          type="hidden"
                          name={field.name}
                          value={field.value}
                        />
                        <SelectTrigger
                          aria-haspopup="listbox"
                          aria-label="Select flow direction"
                          className="w-28"
                        >
                          <SelectValue placeholder="Select flow" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NORTH">North</SelectItem>
                      <SelectItem value="SOUTH">South</SelectItem>
                      <SelectItem value="EAST">East</SelectItem>
                      <SelectItem value="WEST">West</SelectItem>
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
              name="airportConditions.altimeter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Altimeter
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="false"
                      aria-label="Generate random altimeter"
                      onClick={() => {
                        const random = getRandomAltimeter();
                        field.onChange(random);
                      }}
                    >
                      <RefreshCwIcon width={14} height={14} />
                    </button>
                  </FormLabel>{" "}
                  <FormControl>
                    <Input id="altimeter" placeholder="29.92" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={control}
              name="airportConditions.departureOnline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <span className="invisible" aria-hidden="true">
                      Spacer
                    </span>
                  </FormLabel>
                  <div className="mt-2">
                    <FormControl>
                      <ReactFormSwitch field={field}>
                        Departure online
                      </ReactFormSwitch>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
      </CardContent>
    </Card>
  );
}

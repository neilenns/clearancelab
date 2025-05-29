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
import { ReactFormSwitch } from "@/components/ui/react-form-switch";
import { Scenario } from "@/db/scenarios";
import { getRandomAltimeter } from "@workspace/plantools";
import { RefreshCwIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { NumberInput } from "../number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AirportConditionsSection() {
  const { control } = useFormContext<Scenario>();

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
              name={"airportConditions_flow"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flow</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ""}
                  >
                    <FormControl>
                      <div>
                        <input
                          type="hidden"
                          name={field.name}
                          value={field.value ?? ""}
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
              name="airportConditions_altimeter"
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
                  </FormLabel>
                  <FormControl>
                    <NumberInput
                      className="w-30"
                      id="altimeter"
                      fixedDecimalScale={true}
                      decimalScale={2}
                      aria-label="Altimeter"
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
              name="airportConditions_departureOnline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <span className="invisible">Spacer</span>
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

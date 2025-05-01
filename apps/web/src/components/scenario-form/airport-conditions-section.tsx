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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 items-start mb-4">
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
                        <SelectTrigger className="w-28">
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
                  <FormLabel>Altimeter</FormLabel>
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
                  <FormLabel>Departure online?</FormLabel>
                  <FormControl>
                    <ReactFormSwitch field={field} />
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

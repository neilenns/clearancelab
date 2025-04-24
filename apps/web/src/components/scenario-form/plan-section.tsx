import { RefreshCwIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Plan } from "@workspace/validators/plan";
import { getRandomName } from "@workspace/plantools";

interface PlanSectionProps {
  form: UseFormReturn<Plan>;
}

export function PlanSection({ form }: PlanSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight plan</CardTitle>
        <CardDescription>
          Enter the flight plan details. The flight plan does not have to be
          valid, and all fields except AID are optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4 items-start">
          <FormField
            control={form.control}
            name="vatsimId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  VATSIM ID
                  <RefreshCwIcon
                    width="14"
                    height="14"
                    className="self-center"
                  />
                </FormLabel>
                <FormControl>
                  <Input placeholder="1531877" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pilotName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Pilot name</span>
                  <button
                    type="button"
                    onClick={() => {
                      const random = getRandomName();
                      field.onChange(random);
                    }}
                  >
                    <RefreshCwIcon width={14} height={14} />
                  </button>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Quinn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Callsign</FormLabel>
                <FormControl>
                  <Input placeholder="ASA17" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? "" : parseInt(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Beacon{" "}
                  <RefreshCwIcon
                    width="14"
                    height="14"
                    className="self-center"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? "" : parseInt(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="B739" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eq"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment</FormLabel>
                <FormControl>
                  <Input placeholder="L" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure</FormLabel>
                <FormControl>
                  <Input placeholder="KPDX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="KLAS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speed</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? "" : parseInt(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altitude</FormLabel>
                <FormControl>
                  <Input placeholder="350" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rmk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

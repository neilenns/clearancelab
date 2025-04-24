import {
  getRandomBcn,
  getRandomCallsign,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { RefreshCwIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { PasteScenarioDialog } from "./paste-scenario-dialog";

export function PlanSection() {
  const { control } = useFormContext();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 items-start mb-4">
          <div className="col-span-2">
            <FormField
              control={control}
              name="vatsimId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="vatsimId">
                    VATSIM ID
                    <button
                      type="button"
                      aria-label="Generate random VATSIM ID"
                      onClick={() => {
                        const random = getRandomVatsimId();
                        field.onChange(random);
                      }}
                    >
                      <RefreshCwIcon width={14} height={14} />
                    </button>
                  </FormLabel>
                  <FormControl>
                    <Input id="vatsimId" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={control}
              name="pilotName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="pilotName">
                    <span>Name</span>
                    <button
                      type="button"
                      aria-label="Generate random pilot name"
                      onClick={() => {
                        const random = getRandomName();
                        field.onChange(random);
                      }}
                    >
                      <RefreshCwIcon width={14} height={14} />
                    </button>
                  </FormLabel>
                  <FormControl>
                    <Input id="pilotName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 items-start mb-4">
          <FormField
            control={control}
            name="aid"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="aid">
                  AID
                  <button
                    type="button"
                    aria-label="Generate random callsign"
                    onClick={() => {
                      const random = getRandomCallsign();
                      field.onChange(random);
                    }}
                  >
                    <RefreshCwIcon width={14} height={14} />
                  </button>
                </FormLabel>
                <FormControl>
                  <Input id="callsign" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cid">
                  <span>CID</span>
                  <button
                    type="button"
                    aria-label="Generate random CID"
                    onClick={() => {
                      const random = getRandomCid();
                      field.onChange(random);
                    }}
                  >
                    <RefreshCwIcon width={14} height={14} />
                  </button>
                </FormLabel>
                <FormControl>
                  <Input
                    id="cid"
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
            control={control}
            name="bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bcn">
                  BCN
                  <button
                    type="button"
                    aria-label="Generate random beacon"
                    onClick={() => {
                      const random = getRandomBcn();
                      field.onChange(random.toString().padStart(4, "0"));
                    }}
                  >
                    <RefreshCwIcon width={14} height={14} />
                  </button>
                </FormLabel>
                <FormControl>
                  <Input
                    id="bcn"
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
            control={control}
            name="typ"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="typ">TYP</FormLabel>
                <FormControl>
                  <Input id="typ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="eq"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="eq">EQ</FormLabel>
                <FormControl>
                  <Input id="eq" placeholder="L" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dep"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dep">DEP</FormLabel>
                <FormControl>
                  <Input id="dep" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dest"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dest">DEST</FormLabel>
                <FormControl>
                  <Input id="dest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="spd"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="spd">SPD</FormLabel>
                <FormControl>
                  <Input
                    id="spd"
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
            control={control}
            name="alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="alt">ALT</FormLabel>
                <FormControl>
                  <Input id="alt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <FormField
              control={control}
              name="rte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="rte">RTE</FormLabel>
                  <FormControl>
                    <Input id="rte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={control}
              name="rmk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RMK</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PasteScenarioDialog />
      </CardFooter>
    </Card>
  );
}

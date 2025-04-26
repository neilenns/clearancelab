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
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasteScenarioDialog } from "./paste-scenario-dialog";
import { ScenarioInput } from "@workspace/validators";

export function PlanSection() {
  const { control } = useFormContext<ScenarioInput>();

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
              name="plan.vatsimId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
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
              name="plan.pilotName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
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
            name="plan.aid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
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
            name="plan.cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
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
            name="plan.bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
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
            name="plan.typ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TYP</FormLabel>
                <FormControl>
                  <Input id="typ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan.eq"
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
            name="plan.dep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEP</FormLabel>
                <FormControl>
                  <Input id="dep" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan.dest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEST</FormLabel>
                <FormControl>
                  <Input id="dest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan.spd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SPD</FormLabel>
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
            name="plan.alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ALT</FormLabel>
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
              name="plan.rte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RTE</FormLabel>
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
              name="plan.rmk"
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

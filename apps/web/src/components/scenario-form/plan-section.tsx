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
import { ReactFormSwitch } from "@/components/ui/react-form-switch";
import { Textarea } from "@/components/ui/textarea";
import { Scenario } from "@/db/scenarios";
import {
  getRandomAirportCode,
  getRandomBcn,
  getRandomCallsign,
  getRandomCid,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { RefreshCwIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface PlanSectionProperties {
  isEditMode: boolean;
}

export function PlanSection({ isEditMode }: PlanSectionProperties) {
  const { control } = useFormContext<Scenario>();

  // This will be removed and get replaced with the Vatsim import dialog in a separate PR
  if (isEditMode) {
    console.log("Edit mode is enabled");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight plan</CardTitle>
        <CardDescription>
          Enter the flight plan details. The flight plan does not have to be
          valid.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-start mb-4">
          <div>
            <FormField
              control={control}
              name="plan_vatsimId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    VATSIM ID
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="false"
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

          <div>
            <FormField
              control={control}
              name="plan_pilotName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Name</span>
                    <button
                      type="button"
                      aria-label="Generate random pilot name"
                      tabIndex={-1}
                      aria-hidden="false"
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

          <div>
            <FormField
              control={control}
              name="plan_homeAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Home airport</span>
                    <button
                      type="button"
                      aria-label="Generate random home airport"
                      tabIndex={-1}
                      aria-hidden="false"
                      onClick={() => {
                        const random = getRandomAirportCode();
                        field.onChange(random);
                      }}
                    >
                      <RefreshCwIcon width={14} height={14} />
                    </button>
                  </FormLabel>
                  <FormControl>
                    <Input id="homeAirport" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,_1fr)_35px_repeat(4,_1fr)] gap-2 items-start mb-4">
          <FormField
            control={control}
            name="plan_aid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  AID
                  <button
                    type="button"
                    aria-label="Generate random callsign"
                    tabIndex={-1}
                    aria-hidden="false"
                    onClick={() => {
                      const random = getRandomCallsign();
                      field.onChange(random);
                    }}
                  >
                    <RefreshCwIcon width={14} height={14} />
                  </button>
                </FormLabel>
                <FormControl>
                  <Input id="callsign" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>CID</span>
                  <button
                    type="button"
                    aria-label="Generate random CID"
                    tabIndex={-1}
                    aria-hidden="false"
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
                    value={field.value ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(
                        value === "" ? "" : Number.parseInt(value, 10),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  BCN
                  <button
                    type="button"
                    aria-label="Generate random beacon"
                    tabIndex={-1}
                    aria-hidden="false"
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
                    value={field.value ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(
                        value === "" ? "" : Number.parseInt(value, 10),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_typ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TYP</FormLabel>
                <FormControl>
                  <Input id="typ" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_eq"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="eq">EQ</FormLabel>
                <FormControl>
                  <Input id="eq" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_dep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEP</FormLabel>
                <FormControl>
                  <Input id="dep" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_dest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEST</FormLabel>
                <FormControl>
                  <Input id="dest" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_spd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SPD</FormLabel>
                <FormControl>
                  <Input
                    id="spd"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(
                        value === "" ? "" : Number.parseInt(value, 10),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="plan_alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ALT</FormLabel>
                <FormControl>
                  <Input id="alt" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-2">
          <FormField
            control={control}
            name="plan_rte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RTE</FormLabel>
                <FormControl>
                  <Textarea
                    id="rte"
                    className="min-h-10"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-2">
          <FormField
            control={control}
            name="plan_rmk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RMK</FormLabel>
                <FormControl>
                  <Textarea
                    id="rmk"
                    className="min-h-10"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 items-start mb-4">
          <div>
            <FormField
              control={control}
              name="isValid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valid?</FormLabel>
                  <FormDescription>
                    Is the flight plan completely correct with no errors?
                  </FormDescription>
                  <FormControl>
                    <ReactFormSwitch field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={control}
              name="canClear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Can clear?</FormLabel>
                  <FormDescription>
                    Can the flight plan be cleared, even with errors?
                  </FormDescription>
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

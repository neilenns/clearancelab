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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getRandomAirportCode,
  getRandomCallsign,
  getRandomCid,
  getRandomExternalBcn,
  getRandomInternalBcn,
  getRandomName,
  getRandomVatsimId,
} from "@workspace/plantools";
import { ScenarioInput } from "@workspace/validators";
import { RefreshCwIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { VatsimImportDialog } from "./vatsim-import-dialog";

interface PlanSectionProperties {
  isEditMode: boolean;
}

export function PlanSection({ isEditMode }: PlanSectionProperties) {
  const { control } = useFormContext<ScenarioInput>();

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
              name="plan.vatsimId"
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
              name="plan.pilotName"
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
              name="plan.homeAirport"
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

          <div className="self-end">
            {!isEditMode && <VatsimImportDialog />}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,_1fr)_35px_repeat(4,_1fr)] gap-2 items-start mb-4">
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
            name="plan.bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  BCN
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="Generate random beacon"
                        tabIndex={-1}
                        aria-hidden="false"
                        onClick={(event) => {
                          const random = event.shiftKey
                            ? getRandomInternalBcn()
                            : getRandomExternalBcn();
                          field.onChange(random.toString().padStart(4, "0"));
                        }}
                      >
                        <RefreshCwIcon width={14} height={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <>
                        Generates a random beacon for external flights.
                        <br />
                        Shift+click to generate a random beacon for internal
                        flights.
                      </>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input
                    id="bcn"
                    {...field}
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

        <div className="mb-2">
          <FormField
            control={control}
            name="plan.rte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RTE</FormLabel>
                <FormControl>
                  <Textarea id="rte" className="min-h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-2">
          <FormField
            control={control}
            name="plan.rmk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RMK</FormLabel>
                <FormControl>
                  <Textarea id="rmk" className="min-h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 items-start mb-4">
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

          <div>
            <FormField
              control={control}
              name="hasAudio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Has audio?</FormLabel>
                  <FormDescription>
                    Is there an audio file uploaded for this scenario?
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

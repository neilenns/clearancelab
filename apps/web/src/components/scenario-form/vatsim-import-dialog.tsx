import { fetchPlanByCallsign } from "@/api/vatsim/fetch-plan-by-callsign";
import { Input } from "@/components/ui/input";
import { getRandomAltimeter } from "@workspace/plantools";
import { AlertTriangleIcon, ImportIcon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function VatsimImportDialog() {
  const [callsign, setCallsign] = useState("");
  const [open, setOpen] = useState(false);
  const [errorContent, setErrorContent] = useState<React.ReactNode>();
  const [isPending, startTransition] = useTransition();

  const { setValue } = useFormContext();

  function resetDialog() {
    setCallsign("");
    setErrorContent(undefined);
  }

  function handleImport() {
    if (!callsign) {
      setErrorContent("Please enter a callsign.");
      return;
    }

    startTransition(async () => {
      const result = await fetchPlanByCallsign(callsign.toUpperCase());

      if (!result.success) {
        setErrorContent(
          "Unable to find a flight plan for the provided callsign.",
        );
        return;
      }

      // Reset and close the dialog.
      resetDialog();
      setOpen(false);

      const { plan, airportConditions, craft } = result.data;

      // Populate the fields with the values from the VATSIM flight plan.
      // This happens after the dialog is closed to make it feel more responsive.
      setValue("plan.aid", plan.aid);
      setValue("plan.alt", plan.alt);
      setValue("plan.bcn", plan.bcn);
      setValue("plan.cid", plan.cid);
      setValue("plan.dep", plan.dep);
      setValue("plan.dest", plan.dest);
      setValue("plan.eq", plan.eq);
      setValue("plan.rmk", plan.rmk);
      setValue("plan.rte", plan.rte);
      setValue("plan.spd", plan.spd);
      setValue("plan.typ", plan.typ);
      setValue("plan.vatsimId", plan.vatsimId);
      setValue("plan.pilotName", plan.pilotName);
      setValue(
        "airportConditions.altimeter",
        airportConditions.altimeter ?? getRandomAltimeter(),
      );
      setValue("craft.telephony", craft?.telephony ?? "");
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          resetDialog();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <ImportIcon />
          Import from VATSIM
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import flight plan from VATSIM</DialogTitle>
          <DialogDescription>
            Enter the callsign for an active VATSIM flight, then press{" "}
            <b>Import</b> to populate the flight plan with the values.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="SWA2878"
          value={callsign}
          aria-label="Callsign"
          required
          onChange={(event) => {
            setCallsign(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleImport();
            }
          }}
        />
        {errorContent && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Unable to import flight plan</AlertTitle>
            <AlertDescription>{errorContent}</AlertDescription>
          </Alert>
        )}

        <DialogFooter aria-live="polite">
          {isPending ? (
            <Button disabled className="w-[120px]">
              <Loader2 className="animate-spin" />
              Importing...
            </Button>
          ) : (
            <Button
              onClick={handleImport}
              className="w-[120px]"
              aria-label="Import flight plan from VATSIM"
            >
              Import
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

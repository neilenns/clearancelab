import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Plan, PlanSchema } from "@workspace/validators/plan";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ImportIcon } from "lucide-react";

export function PasteScenarioDialog() {
  const form = useFormContext();
  const [jsonInput, setJsonInput] = useState("");
  const [open, setOpen] = useState(false);

  function handleImport() {
    let rawData;

    try {
      rawData = JSON.parse(jsonInput) as Plan;
    } catch (err: unknown) {
      const error = err as Error;

      console.log(`Unable to parse JSON: ${error.message}`);
      toast.error("The provided JSON isn't valid.");
      return;
    }

    const result = PlanSchema.safeParse(rawData);

    if (!result.success) {
      console.error("Validation errors:", result.error.errors);
      toast.error("The provided scenario is invalid.");
      return;
    }

    const defaults = form.getValues();

    form.reset({ ...defaults, ...result.data });
    toast.success("Scenario imported!");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <ImportIcon />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import scenario</DialogTitle>
          <DialogDescription>
            Paste valid scenario JSON below, then press <b>Import</b> to
            populate the flight plan with the values.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Paste scenario JSON"
          className="min-h-[200px] max-h-[400px]"
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
          }}
        />
        <DialogFooter>
          <Button onClick={handleImport}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

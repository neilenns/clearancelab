import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { PlanSchema } from "@workspace/validators/plan";
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
      rawData = JSON.parse(jsonInput);
    } catch (err: any) {
      // TODO: display a clear “Invalid JSON” message to the user
      console.error("JSON parse error:", err);
      return;
    }

    const result = PlanSchema.safeParse(rawData);
    if (!result.success) {
      // TODO: display result.error.errors for user-friendly feedback
      console.error("Validation errors:", result.error.errors);
      return;
    }

    const parsed = result.data;
    const defaults = form.getValues();
    form.reset({ ...defaults, ...parsed });
  }
      const defaults = form.getValues();

      form.reset({ ...defaults, ...parsed });
      toast.success("Scenario imported!");
      setOpen(false);
    } catch (_err) {
      toast.error("Invalid JSON or validation failed");
    }
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
          <DialogTitle>Import a scenario</DialogTitle>
          <DialogDescription>
            Paste valid scenario JSON below, then press <b>Import</b> to
            populate the flight plan with the values.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Paste scenario JSON"
          className="min-h-[200] max-h-[400]"
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

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
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
import { AlertTriangleIcon, ImportIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Plan, PlanSchema } from "@workspace/validators";

export function PasteScenarioDialog() {
  const form = useFormContext();
  const [jsonInput, setJsonInput] = useState("");
  const [open, setOpen] = useState(false);
  const [errorContent, setErrorContent] = useState<React.ReactNode>();

  function handleImport() {
    let rawData;

    try {
      rawData = JSON.parse(jsonInput) as Plan;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Unable to parse JSON: ${error.message}`);
      } else {
        console.log("Unable to parse JSON:", error);
      }
      setErrorContent(<div>The provided JSON isn&apos;t valid.</div>);
      return;
    }

    const result = PlanSchema.safeParse(rawData);

    if (!result.success) {
      console.log("Validation errors:", result.error.errors);

      const formatted = result.error.errors.map((error, index) => {
        const path = error.path.join(".") || "root";
        return (
          <li key={index}>
            <strong>{path}</strong>: {error.message}
          </li>
        );
      });

      setErrorContent(
        <ul className="list-disc list-inside space-y-1">{formatted}</ul>
      );

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
          className="min-h-[200px] max-h-[200px]"
          value={jsonInput}
          onChange={(event) => {
            setJsonInput(event.target.value);
          }}
        />
        {errorContent && (
          <Alert variant="error">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Unable to import scenario</AlertTitle>
            <AlertDescription>{errorContent}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button onClick={handleImport}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

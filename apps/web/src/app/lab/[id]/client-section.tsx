"use client";

import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { onDeleteScenario } from "@/components/scenario-form/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Scenario } from "@workspace/validators";
import Link from "next/link";

interface ClientSectionProperties {
  scenario: Scenario;
  canEdit: boolean;
}

export default function ClientSection({
  scenario,
  canEdit,
}: ClientSectionProperties) {
  const deleteScenario = async () => {
    if (!scenario._id) {
      console.error("Scenario ID is missing");
      return;
    }

    await onDeleteScenario(scenario._id);
  };

  return (
    <main className="p-6 overflow-y-auto">
      {canEdit && (
        <div className="space-x-2">
          <Button asChild>
            <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently the
                  scenario.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={deleteScenario} variant="destructive">
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}

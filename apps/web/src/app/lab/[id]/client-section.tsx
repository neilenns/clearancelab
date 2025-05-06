"use client";

import { Answer } from "@/components/answer";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import FPE from "@/components/fpe/fpe";
import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { Scenario } from "@workspace/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ClientSectionProperties {
  scenario: Scenario;
  canEdit: boolean;
}

export default function ClientSection({
  scenario,
  canEdit,
}: ClientSectionProperties) {
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const deleteScenarioHandler = async () => {
    toast.promise(deleteScenario(scenario._id), {
      loading: "Deleting scenario...",
      success: () => {
        router.replace("/lab");
        return "Scenario deleted successfully";
      },
      error: () => {
        return "Error deleting scenario";
      },
    });
  };

  return (
    <main className="p-6 overflow-y-auto">
      {canEdit && (
        <div className="space-x-2">
          <Button asChild>
            <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </Button>
          <ConfirmDeleteDialog
            onConfirm={deleteScenarioHandler}
            isDialogOpen={isDeleteDialogOpen}
            setIsDialogOpen={setIsDeleteDialogOpen}
          />
        </div>
      )}
      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}

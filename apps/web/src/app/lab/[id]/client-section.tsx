"use client";

import { Answer } from "@/components/answer";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import FPE from "@/components/fpe/fpe";
import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { useCheckPermissions } from "@/hooks/useCheckPermissions";
import { Scenario } from "@workspace/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ClientSectionProperties {
  scenario: Scenario;
}

const permissionsToVerify = ["edit:scenarios", "delete:scenarios"];

export default function ClientSection({ scenario }: ClientSectionProperties) {
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const { permissionsStatus } = useCheckPermissions(permissionsToVerify);

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
      <div className="space-x-2 mb-4">
        {permissionsStatus["edit:scenarios"] && (
          <Button asChild>
            <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
          </Button>
        )}
        {permissionsStatus["delete:scenarios"] && (
          <>
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
          </>
        )}
      </div>

      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}

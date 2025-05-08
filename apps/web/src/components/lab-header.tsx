"use client";

import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { useCheckPermissions } from "@/hooks/useCheckPermissions";
import { Permissions, Scenario } from "@workspace/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";

interface LabHeaderProperties {
  scenario: Scenario;
}

const permissionsToVerify = [
  Permissions.EditScenarios,
  Permissions.DeleteScenarios,
];

export function LabHeader({ scenario }: LabHeaderProperties) {
  const router = useRouter();
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b px-4"
      role="banner"
      aria-label={`Lab scenario page header`}
    >
      {scenario.plan.dep} - {scenario.plan.dest} ({scenario.plan.aid})
      <div className="space-x-2">
        {permissionsStatus[Permissions.EditScenarios] && (
          <Button asChild>
            <Link
              href={`/admin/scenarios/edit/${scenario._id}`}
              aria-label="Edit scenario"
            >
              Edit
            </Link>
          </Button>
        )}
        {permissionsStatus[Permissions.DeleteScenarios] && (
          <>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              aria-label="Delete scenario"
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
    </header>
  );
}

"use client";

import { Answer } from "@/components/answer";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import FPE from "@/components/fpe/fpe";
import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { useUser } from "@auth0/nextjs-auth0";
import { Scenario } from "@workspace/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ClientSectionProperties {
  scenario: Scenario;
  disableAuth: boolean;
}

export default function ClientSection({
  scenario,
  disableAuth,
}: ClientSectionProperties) {
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (disableAuth) {
      setCanEdit(true);
      setCanDelete(true);
      return;
    }

    if (isLoading) {
      return;
    }

    if (error || !user) {
      console.error("Error fetching user:", error);
      setCanEdit(false);
      setCanDelete(false);
      return;
    }

    setCanEdit(user.permissions.includes("edit:scenarios"));
    setCanDelete(user.permissions.includes("delete:scenarios"));
  }, [user, isLoading, error, disableAuth]);

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
        {canEdit && (
          <Button asChild>
            <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
          </Button>
        )}
        {canDelete && (
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

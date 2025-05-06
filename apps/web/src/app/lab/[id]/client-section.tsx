"use client";

import { Answer } from "@/components/answer";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import FPE from "@/components/fpe/fpe";
import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
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
  const onDelete = useDeleteScenario();

  return (
    <main className="p-6 overflow-y-auto">
      {canEdit && (
        <div className="space-x-2">
          <Button asChild>
            <Link href={`/admin/scenarios/edit/${scenario._id}`}>Edit</Link>
          </Button>
          <ConfirmDeleteDialog
            onConfirm={() => onDelete(scenario._id)}
            trigger={
              <Button variant="destructive" aria-label="Delete scenario">
                Delete
              </Button>
            }
          />
        </div>
      )}
      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}

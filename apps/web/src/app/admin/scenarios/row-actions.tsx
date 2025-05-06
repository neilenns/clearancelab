import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { Pencil } from "lucide-react";
import Link from "next/link";

type RowActionsProperties = {
  scenarioId?: string;
};

export const RowActions = ({ scenarioId }: RowActionsProperties) => {
  const deleteScenario = useDeleteScenario();

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/scenarios/edit/${scenarioId}`}
        aria-label="Edit scenario"
      >
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <ConfirmDeleteDialog
        onConfirm={() => deleteScenario(scenarioId, { redirect: false })}
      />
    </div>
  );
};

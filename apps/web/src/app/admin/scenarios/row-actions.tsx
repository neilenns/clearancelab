import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type RowActionsProperties = {
  scenarioId?: string;
};

export const RowActions = ({ scenarioId }: RowActionsProperties) => {
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteScenarioHandler = async () => {
    toast.promise(deleteScenario(scenarioId), {
      loading: "Deleting scenario...",
      success: () => {
        return "Scenario deleted successfully";
      },
      error: () => {
        return "Error deleting scenario";
      },
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/admin/scenarios/edit/${scenarioId}`}
              aria-label="Edit scenario"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDeleteDialog
        aria-label="Delete scenario"
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
        onConfirm={deleteScenarioHandler}
      />
    </div>
  );
};

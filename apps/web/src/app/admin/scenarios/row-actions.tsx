import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { Permissions } from "@/types/permissions";
import { Edit, ExternalLinkIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type RowActionsProperties = {
  scenarioId: number;
};

const permissionsToVerify = [
  Permissions.EditScenarios,
  Permissions.DeleteScenarios,
];

export const RowActions = ({ scenarioId }: RowActionsProperties) => {
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { permissionsStatus } = useCheckPermissions(permissionsToVerify);

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(
      `${globalThis.location.origin}/lab/${scenarioId.toString()}`,
    );
    toast.success("Link copied to clipboard");
  };

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
      <Button variant="ghost" size="icon" asChild>
        <Link
          href={`/lab/${scenarioId}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View scenario"
        >
          <ExternalLinkIcon />
        </Link>
      </Button>
      {permissionsStatus[Permissions.EditScenarios] && (
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={`/admin/scenarios/edit/${scenarioId}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Edit scenario"
          >
            <Edit />
          </Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={copyLinkHandler}
            aria-label="Copy scenario link to clipboard"
          >
            Copy link
          </DropdownMenuItem>
          {permissionsStatus[Permissions.DeleteScenarios] && (
            <DropdownMenuItem
              className="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              aria-label="Delete scenario"
            >
              Delete
            </DropdownMenuItem>
          )}
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

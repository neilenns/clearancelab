"use client";

import { Button } from "@/components/ui/button";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { useDeleteScenario } from "@/hooks/use-delete-scenario";
import { useUser } from "@auth0/nextjs-auth0";
import { Permissions } from "@workspace/validators";
import { LinkIcon, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added usePathname
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

const copyLinkHandler = () => {
  const url = new URL(
    globalThis.location.pathname,
    globalThis.location.origin,
  ).toString();

  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("Link copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link to clipboard");
    });
};

export function LabHeader({ scenario }: LabHeaderProperties) {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const { user, isLoading } = useUser();
  const deleteScenario = useDeleteScenario();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { permissionsStatus } = useCheckPermissions(permissionsToVerify);

  const deleteScenarioHandler = async () => {
    toast.promise(deleteScenario(scenario.id.toString()), {
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
      <div className="flex items-center gap-2">
        {scenario.plan_dep} - {scenario.plan_dest} ({scenario.plan_aid})
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Copy link to scenario"
          onClick={copyLinkHandler}
        >
          <LinkIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="space-x-2">
        {permissionsStatus[Permissions.EditScenarios] && (
          <Button variant="outline" asChild>
            <Link
              href={`/admin/scenarios/edit/${scenario.id.toString()}`}
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
        {!isLoading && user && (
          <Button variant="ghost" size="icon" asChild>
            <a href="/auth/logout">
              <LogOut aria-hidden="true" />
              <span className="sr-only">Log out</span>
            </a>
          </Button>
        )}
        {!isLoading && !user && (
          <Button variant="ghost" size="icon" asChild>
            <a href={`/auth/login?returnTo=${pathname}`}>
              <LogIn aria-hidden="true" />
              <span className="sr-only">Log in</span>
            </a>
          </Button>
        )}
      </div>
    </header>
  );
}

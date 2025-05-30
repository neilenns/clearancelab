"use client";

import { AdminSidebar } from "@/components/admin-sidebar/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { Permissions } from "@/types/permissions";
import React from "react";
import UnauthorizedPage from "./unauthorized";

export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { permissionsStatus, isLoading } = useCheckPermissions(
    Permissions.ViewAdmin,
  );

  if (isLoading) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-4"
        aria-label="Loading scenarios"
      >
        <div role="status">
          <Spinner size="medium" aria-live="polite">
            <span>Logging in...</span>
          </Spinner>
        </div>
      </main>
    );
  }

  if (!permissionsStatus[Permissions.ViewAdmin]) {
    return <UnauthorizedPage />;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

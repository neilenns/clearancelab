import { AdminSidebar } from "@/components/admin-sidebar/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { checkPermissions } from "@/lib/check-permissions";
import { ENV } from "@/lib/environment";
import { Permissions } from "@workspace/validators";
import type { Metadata } from "next";
import UnauthorizedPage from "./unauthorized";

const description = "Administration tools for Clearance Lab";
const title = "Admin | Clearance Lab";
const basePath = "/admin";
const url = new URL(basePath, ENV.APP_BASE_URL);

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    type: "website",
  },
  twitter: {
    title,
    description,
    card: "summary",
    images: [
      {
        url: new URL("/logo.svg", ENV.APP_BASE_URL),
        alt: "Clearance Lab logo, a beaker half filled with blue liquid.",
      },
    ],
  },
};

export default async function Layout({ children }: LayoutProps<"/admin">) {
  const hasPermission = await checkPermissions(Permissions.ViewAdmin);

  if (!hasPermission) {
    return <UnauthorizedPage />;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

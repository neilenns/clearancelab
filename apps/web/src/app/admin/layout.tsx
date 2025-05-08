import { AdminSidebar } from "@/components/admin-sidebar/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "@/lib/environment";
import type { Metadata } from "next";
import UnauthorizedPage from "./unauthorized";

const description = "Administration tools for Clearance Lab";
const title = "Admin | Clearance Lab";
const url = "https://clearancelab.badcasserole.com/admin";

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
        url: `https://clearancelab.badcasserole.com/logo.svg`,
        alt: "Clearance Lab logo, a beaker half filled with blue liquid.",
      },
    ],
  },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth0Client().getSession();

  if (!ENV.DISABLE_AUTH && !session?.user.permissions.includes("view:admin")) {
    return <UnauthorizedPage />;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

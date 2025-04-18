import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiFetch } from "@/lib/api";
import { ScenarioData } from "@/models/scenario";
import type { Metadata } from "next";

const description = "Scenarios to practice your flight plan review skills.";
const title = "Scenarios | Clearance Lab";
const url = "https://clearancelab.badcasserole.com/lab";

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
  const scenarios =
    (await apiFetch<ScenarioData[]>("/scenarios/?summary=true")) ?? [];

  return (
    <SidebarProvider>
      <AppSidebar scenarios={scenarios} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

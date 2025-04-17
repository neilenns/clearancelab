import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiFetch } from "@/lib/api";
import { ScenarioData } from "@/models/scenario";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice flight plans",
  description:
    "Get practice reviewing flight plans and issuing clearances with flight plans ripped straight from real VATSIM pilots.",
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

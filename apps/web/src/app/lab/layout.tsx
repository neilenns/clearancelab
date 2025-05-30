import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { LabSidebar } from "@/components/lab-sidebar/lab-sidebar";
import { Loading } from "@/components/loading";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ENV } from "@/lib/environment";
import type { Metadata } from "next";
import { Suspense } from "react";

const description = "Scenarios to practice your flight plan review skills.";
const title = "Scenarios | Clearance Lab";
const pagePath = "/lab";
const url = new URL(pagePath, ENV.APP_BASE_URL);

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

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await fetchScenariosSummary();
  const scenarios = result.success ? result.data : [];

  return (
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <LabSidebar scenarios={scenarios} />
      </Suspense>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

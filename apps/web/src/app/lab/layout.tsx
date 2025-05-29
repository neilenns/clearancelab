import { LabSidebar } from "@/components/lab-sidebar/lab-sidebar";
import { Loading } from "@/components/loading";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSummaryScenarios, SummaryScenarios } from "@/db/scenarios";
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
  let scenarios: SummaryScenarios;

  try {
    scenarios = await getSummaryScenarios();
  } catch (error) {
    console.error("Failed to load scenarios in layout:", error);
    scenarios = []; // Fallback to empty array to prevent layout failure
  }

  return (
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <LabSidebar scenarios={scenarios} />
      </Suspense>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

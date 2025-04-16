import Sidebar from "@/components/sidebar";
import { getAllScenarios } from "@/lib/scenarioUtils";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Practice flight plans",
  description:
    "Get practice reviewing flight plans and issuing clearances with flight plans ripped straight from real VATSIM pilots.",
};

export default function Layout({
  children: mainSection,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="grid grid-cols-[250px_1fr] h-screen">
        <Sidebar scenarios={getAllScenarios()} />

        {mainSection}
      </div>
      <Toaster richColors />
    </div>
  );
}

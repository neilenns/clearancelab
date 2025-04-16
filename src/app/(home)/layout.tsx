import Sidebar from "@/components/sidebar";
import { connectToDatabase } from "@/lib/db";
import { ScenarioModel } from "@/models/scenario";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Practice flight plans",
  description:
    "Get practice reviewing flight plans and issuing clearances with flight plans ripped straight from real VATSIM pilots.",
};

export default async function Layout({
  children: mainSection,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDatabase();
  const scenarios = await ScenarioModel.find().lean();

  return (
    <div>
      <div className="grid grid-cols-[250px_1fr] h-screen">
        <Sidebar scenarios={scenarios} />

        {mainSection}
      </div>
      <Toaster richColors />
    </div>
  );
}

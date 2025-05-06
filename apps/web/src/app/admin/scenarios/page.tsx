"use server";
import { fetchScenarios } from "@/api/scenarios/fetch-scenarios";
import { SiteHeader } from "@/components/site-header";
import ClientSection from "./client-section";

export default async function Page() {
  const result = await fetchScenarios();
  const scenarios = result.success ? result.data : [];

  return (
    <div>
      <SiteHeader />
      <main
        className="flex h-full flex-col justify-center px-4 py-4"
        aria-label="Scenarios management"
      >
        <ClientSection scenarios={scenarios} />
      </main>
    </div>
  );
}

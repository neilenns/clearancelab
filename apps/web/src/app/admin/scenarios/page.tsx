"use server";
import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { AdminHeader } from "@/components/admin-header";
import ClientSection from "./client-section";

export default async function Page() {
  const result = await fetchScenariosSummary();
  const scenarios = result.success ? result.data : [];

  return (
    <div>
      <AdminHeader />
      <main
        className="flex h-full flex-col justify-center px-4 py-4"
        aria-label="Scenarios management"
      >
        <ClientSection scenarios={scenarios} />
      </main>
    </div>
  );
}

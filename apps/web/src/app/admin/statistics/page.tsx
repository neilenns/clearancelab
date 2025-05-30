"use server";

import { AdminHeader } from "@/components/admin-header";
import { getScenarioStatistics, ScenarioStatistics } from "@/db/scenarios";
import ClientSection from "./client-section";

export default async function Page() {
  let statistics: ScenarioStatistics;

  try {
    statistics = await getScenarioStatistics();
  } catch (error) {
    console.error("Unable to retrieve scenario statistics:", error);
    return (
      <div>
        <AdminHeader />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <main
        className="flex h-full flex-col justify-center px-4 py-4"
        aria-label="Clearance Lab statistics"
      >
        <ClientSection statistics={statistics} />
      </main>
    </div>
  );
}

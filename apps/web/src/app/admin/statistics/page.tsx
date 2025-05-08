"use server";
import { fetchPlanStatistics } from "@/api/statistics/fetch-plan-statistics";
import { AdminHeader } from "@/components/admin-header";
import ClientSection from "./client-section";

export default async function Page() {
  const result = await fetchPlanStatistics();
  const statistics = result.success ? result.data : [];

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

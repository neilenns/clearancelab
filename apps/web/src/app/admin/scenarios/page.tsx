"use server";
import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { AdminHeader } from "@/components/admin-header";
import { Suspense } from "react";
import ClientSection from "./client-section";
import Loading from "./loading";

export default async function Page() {
  const result = await fetchScenariosSummary({ includeDrafts: true });
  const scenarios = result.success ? result.data : [];

  return (
    <div>
      <AdminHeader />
      <Suspense fallback={<Loading />}>
        <main
          className="flex h-full flex-col justify-center px-4 py-4"
          aria-label="Scenarios management"
        >
          <ClientSection scenarios={scenarios} />
        </main>
      </Suspense>
    </div>
  );
}

"use server";
import { AdminHeader } from "@/components/admin-header";
import { getSummaryScenarios } from "@/db/scenarios";
import { Suspense } from "react";
import ClientSection from "./client-section";
import Loading from "./loading";

export default async function Page() {
  const scenarios = await getSummaryScenarios();

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

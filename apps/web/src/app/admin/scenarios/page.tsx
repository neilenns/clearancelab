"use server";
import { AdminHeader } from "@/components/admin-header";
import { getSummaryScenarios, SummaryScenarios } from "@/db/scenarios";
import { Suspense } from "react";
import ClientSection from "./client-section";
import Loading from "./loading";

export default async function Page() {
  let scenarios: SummaryScenarios;

  // There is no way to turn of pre-rendering of pages during nextjs builds, and during build
  // there's no Cloudflare context available so this throws an exception. Wrap it in a try/catch
  // and return an empty list of scenarios so builds don't fail.
  try {
    scenarios = await getSummaryScenarios();
  } catch (error) {
    console.error("Failed to load scenarios in layout:", error);
    scenarios = []; // Fallback to empty array to prevent layout failure
  }

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

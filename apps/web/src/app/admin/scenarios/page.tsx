"use server";
import { fetchScenarios } from "@/api/scenarios/fetch-scenarios";
import { SiteHeader } from "@/components/site-header";
import { defaultColumns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const result = await fetchScenarios();
  const scenarios = result.success ? result.data : [];

  return (
    <div>
      <SiteHeader title="Scenarios" />
      <main className="flex h-full flex-col items-center justify-center text-center px-4 py-4">
        <DataTable columns={defaultColumns} data={scenarios} />
      </main>
    </div>
  );
}

"use server";
import { fetchScenarios } from "@/api/scenarios/fetch-scenarios";
import { defaultColumns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const result = await fetchScenarios();
  const scenarios = result.success ? result.data : [];

  return (
    <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
      <h1>Scenario manager</h1>
      <DataTable columns={defaultColumns} data={scenarios} />
    </main>
  );
}

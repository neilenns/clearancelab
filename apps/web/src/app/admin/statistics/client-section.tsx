"use client";

import PieChart from "@/components/pie-chart";
import { ScenarioStatistics } from "@/db/scenarios";

interface ClientSectionProperties {
  statistics: ScenarioStatistics;
}

export default function ClientSection({ statistics }: ClientSectionProperties) {
  if (!statistics) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center px-4 py-4"
        aria-label="No statistics available"
      >
        <p>No statistics available.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      aria-label="Plan statistics container"
    >
      <PieChart
        chartData={statistics.departures}
        title="Departures"
        baseUrl="/admin/scenarios?columnFilters.plan.dep="
      />
      <PieChart
        chartData={statistics.destinations}
        title="Arrivals"
        baseUrl="/admin/scenarios?columnFilters.plan.dest="
      />
      <PieChart
        chartData={statistics.canClear}
        title="Can clear"
        baseUrl="/admin/scenarios?columnFilters.canClear="
        isBoolean={true}
      />
      <PieChart
        chartData={statistics.isValid}
        title="Is Valid"
        baseUrl="/admin/scenarios?columnFilters.isValid="
        isBoolean={true}
      />
    </div>
  );
}

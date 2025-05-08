"use client";

import PieChart from "@/components/pie-chart";
import { PlanStatistics } from "@workspace/validators";

interface ClientSectionProperties {
  statistics: PlanStatistics;
}

export default function ClientSection({ statistics }: ClientSectionProperties) {
  return (
    <div
      className="flex flex-row space-x-2"
      aria-label="Plan statistics container"
    >
      <PieChart
        chartData={statistics.departures}
        title="Departures"
        baseUrl="http://localhost:3000/admin/scenarios?columnFilters.plan.dep="
      />
      <PieChart
        chartData={statistics.destinations}
        title="Arrivals"
        baseUrl="http://localhost:3000/admin/scenarios?columnFilters.plan.dest="
      />
    </div>
  );
}

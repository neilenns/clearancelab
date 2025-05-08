"use client";

import PieChart from "@/components/pie-chart";
import { PlanStatistics } from "@workspace/validators";

interface ClientSectionProperties {
  statistics: PlanStatistics;
}

export default function ClientSection({ statistics }: ClientSectionProperties) {
  return (
    <div
      className="flex flex-wrap gap-2"
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
      <PieChart
        chartData={statistics.canClear}
        title="Can clear"
        baseUrl="http://localhost:3000/admin/scenarios?columnFilters.canClear="
        isBoolean={true}
      />
      <PieChart
        chartData={statistics.isValid}
        title="Is Valid"
        baseUrl="http://localhost:3000/admin/scenarios?columnFilters.isValid="
        isBoolean={true}
      />
    </div>
  );
}

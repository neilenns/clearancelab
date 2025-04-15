import React from "react";
import "@/styles/layout.css";
import FlightPlanItem from "@/components/flightPlanItem";
import { normalizeFlightPlan } from "@/lib/flightPlanUtils";
import { FlightPlan } from "@/interfaces/flightPlan";

interface SidebarProps {
  plans: FlightPlan[];
  selectedFlightPlan: FlightPlan | null;
  onSelect: (plan: FlightPlan) => void;
}

export default function Sidebar({
  plans,
  selectedFlightPlan,
  onSelect,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>Flight Plans</h2>
      <ul>
        {plans.map((plan) => (
          <FlightPlanItem
            plan={normalizeFlightPlan(plan)}
            key={plan.id}
            onClick={() => {
              onSelect(plan);
            }}
            selected={selectedFlightPlan?.id === plan.id}
          />
        ))}
      </ul>
    </aside>
  );
}

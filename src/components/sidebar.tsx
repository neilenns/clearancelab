import React from "react";
import "@/styles/layout.css";
import FlightPlanItem from "@/components/flightPlanItem";
import flightPlansData from "@/data/flightPlans.json" assert { type: "json" };
import { normalizeFlightPlan } from "@/lib/flightPlanUtils";
import { FlightPlan } from "@/interfaces/flightPlan";

interface SidebarProps {
  onSelect: (plan: FlightPlan) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>Flight Plans</h2>
      <ul>
        {flightPlansData.map((plan, index) => (
          <FlightPlanItem
            plan={normalizeFlightPlan(plan)}
            key={index}
            onClick={() => {
              onSelect(plan);
            }}
          />
        ))}
      </ul>
    </aside>
  );
}

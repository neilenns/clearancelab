"use client";

import React from "react";
import "@/styles/sidebar.css";
import FlightPlanItem from "@/components/flightPlanItem";
import { normalizeFlightPlan } from "@/lib/flightPlanUtils";
import { FlightPlan } from "@/interfaces/flightPlan";
import { useParams } from "next/navigation";

interface SidebarProps {
  plans: FlightPlan[];
}

export default function Sidebar({ plans }: SidebarProps) {
  const params = useParams();
  const selectedId = parseInt(params.id as string, 10);

  return (
    <aside className="sidebar">
      <h2>Flight Plans</h2>
      <ul>
        {plans.map((plan) => (
          <FlightPlanItem
            plan={normalizeFlightPlan(plan)}
            key={plan.id}
            selected={selectedId === plan.id}
          />
        ))}
      </ul>
    </aside>
  );
}

"use client";

import React from "react";
import "@/styles/sidebar.css";
import FlightPlanItem from "@/components/flightPlanItem";
import { FlightPlan } from "@/interfaces/flightPlan";
import { useParams } from "next/navigation";

interface SidebarProps {
  plans: FlightPlan[];
}

export default function Sidebar({ plans }: SidebarProps) {
  const params = useParams();
  const selectedId = params.id as string;

  return (
    <aside className="sidebar">
      <h2 className="header">Flight Plans</h2>
      <ul>
        {plans.map((plan) => {
          const normalizedPlan = plan;

          return (
            <FlightPlanItem
              plan={normalizedPlan}
              key={plan.id}
              selected={selectedId === plan.id}
            />
          );
        })}
      </ul>
    </aside>
  );
}

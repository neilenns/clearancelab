"use client";

import React from "react";
import "@/styles/sidebar.css";
import ScenarioItem from "@/components/scenarioItem";
import { useParams } from "next/navigation";
import Scenario from "@/interfaces/scenario";

interface SidebarProps {
  scenarios: Scenario[];
}

export default function Sidebar({ scenarios }: SidebarProps) {
  const params = useParams();
  const selectedId = params.id as string;

  return (
    <aside className="sidebar">
      <h2 className="header">Scenarios</h2>
      <ul>
        {scenarios.map((scenario) => {
          return (
            <ScenarioItem
              scenario={scenario}
              key={scenario.id}
              selected={selectedId === scenario.id}
            />
          );
        })}
      </ul>
    </aside>
  );
}

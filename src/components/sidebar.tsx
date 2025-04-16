"use client";

import ScenarioItem from "@/components/scenarioItem";
import { Scenario } from "@/models/scenario";
import "@/styles/sidebar.css";
import { useParams } from "next/navigation";

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
              key={scenario._id}
              selected={selectedId === scenario._id}
            />
          );
        })}
      </ul>
    </aside>
  );
}

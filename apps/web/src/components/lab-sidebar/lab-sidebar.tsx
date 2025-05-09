"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScenarioSummary } from "@workspace/validators";
import { WandSparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useKey } from "react-use";
import { ScenarioTable } from "../scenario-table";
import { useSidebarColumns } from "./use-sidebar-columns";

// Extend the props from the base Sidebar and add scenarios
interface LabSidebarProperties extends React.ComponentProps<typeof Sidebar> {
  scenarios: ScenarioSummary[];
}

export function LabSidebar({ scenarios, ...properties }: LabSidebarProperties) {
  const parameters = useParams();
  const selectedId = parameters.id as string;
  const router = useRouter();
  const columns = useSidebarColumns();

  const navigateToScenario = useCallback(
    (scenarioId: string) => {
      // The search parameters are grabbed directly instead of using a hook to ensure
      // they are always the latest. Per the docs, it includes the leading "?" so
      // no need to add it.
      router.replace(`/lab/${scenarioId}${globalThis.location.search}`);
    },
    [router],
  );

  const [filteredScenarios, setFilteredScenarios] =
    useState<ScenarioSummary[]>(scenarios);

  const onRowSelected = useCallback(
    (scenario: ScenarioSummary) => {
      // The search parameters are grabbed directly instead of using a hook to ensure
      // they are always the latest. Per the docs, it includes the leading "?" so
      // no need to add it.
      navigateToScenario(scenario._id);
    },
    [navigateToScenario],
  );

  const onFilteredRowsChange = useCallback((rows: ScenarioSummary[]) => {
    setFilteredScenarios(rows);
  }, []);

  const onSurprise = useCallback(() => {
    const active = document.activeElement;
    const isTyping =
      active?.tagName === "INPUT" ||
      active?.tagName === "TEXTAREA" ||
      (active instanceof HTMLElement && active.isContentEditable);

    if (isTyping) {
      return;
    }

    if (filteredScenarios.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredScenarios.length);
    const randomScenario = filteredScenarios[randomIndex];

    if (randomScenario._id) {
      navigateToScenario(randomScenario._id);
    }
  }, [filteredScenarios, navigateToScenario]);

  useKey("s", onSurprise);

  return (
    <aside aria-label="Scenarios">
      <Sidebar {...properties}>
        <SidebarHeader>
          <h3>Scenarios</h3>
          <Button onClick={onSurprise} aria-label="Select a random scenario">
            <WandSparkles />
            Surprise me!
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <ScenarioTable
                data={scenarios}
                columns={columns}
                onRowSelected={onRowSelected}
                selectedId={selectedId}
                onFilteredRowsChange={onFilteredRowsChange}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}

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
import { SummaryScenario, SummaryScenarios } from "@/db/scenarios";
import { WandSparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useKey } from "react-use";
import { ScenarioTable } from "../scenario-table";
import { useSidebarColumns } from "./use-sidebar-columns";

// Extend the props from the base Sidebar and add scenarios
interface LabSidebarProperties extends React.ComponentProps<typeof Sidebar> {
  scenarios: SummaryScenarios;
}

export function LabSidebar({ scenarios, ...properties }: LabSidebarProperties) {
  const parameters = useParams();
  const selectedId = Number(parameters.id);
  const router = useRouter();
  const columns = useSidebarColumns();

  const navigateToScenario = useCallback(
    (scenarioId: number) => {
      // The search parameters are grabbed directly instead of using a hook to ensure
      // they are always the latest. Per the docs, it includes the leading "?" so
      // no need to add it.
      router.replace(
        `/lab/${scenarioId.toString()}${globalThis.location.search}`,
      );
    },
    [router],
  );

  const [filteredScenarios, setFilteredScenarios] =
    useState<SummaryScenarios>(scenarios);

  const onRowSelected = useCallback(
    (scenario: SummaryScenario) => {
      // The search parameters are grabbed directly instead of using a hook to ensure
      // they are always the latest. Per the docs, it includes the leading "?" so
      // no need to add it.
      navigateToScenario(scenario.id);
    },
    [navigateToScenario],
  );

  const onFilteredRowsChange = useCallback((rows: SummaryScenarios) => {
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

    let attempts = 0;
    let randomScenario: SummaryScenario;

    // This is a bit of a hack to ensure we don't select the same scenario twice in a row.
    // Try up to 20 times to find a different scenario. Ideally this would work with a list
    // of scenarios that haven't been seen yet, but I had all sorts of React state problems trying
    // to implement that.
    if (filteredScenarios.length === 1) {
      randomScenario = filteredScenarios[0];
    } else {
      do {
        const randomIndex = Math.floor(
          Math.random() * filteredScenarios.length,
        );
        randomScenario = filteredScenarios[randomIndex];
        attempts++;
      } while (randomScenario.id === selectedId && attempts < 20);
    }

    if (randomScenario.id) {
      navigateToScenario(randomScenario.id);
    }
  }, [filteredScenarios, navigateToScenario, selectedId]);

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

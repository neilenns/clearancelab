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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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
  const query = useSearchParams();

  const onRowSelected = useCallback(
    (scenario: ScenarioSummary) => {
      router.replace(`/lab/${scenario._id}?${query.toString()}`);
    },
    [router, query],
  );

  const onSurprise = useCallback(() => {
    const active = document.activeElement;
    const isTyping =
      active?.tagName === "INPUT" ||
      active?.tagName === "TEXTAREA" ||
      (active instanceof HTMLElement && active.isContentEditable);

    if (isTyping) {
      return;
    }

    if (scenarios.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const randomScenario = scenarios[randomIndex];

    if (randomScenario._id) {
      router.replace(`/lab/${randomScenario._id}`);
    }
  }, [scenarios, router]);

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

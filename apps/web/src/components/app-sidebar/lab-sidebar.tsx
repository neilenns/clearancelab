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
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ScenarioSummary } from "@workspace/validators";
import { WandSparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useKey } from "react-use";
import { ScenarioItem } from "./scenario-item";

// Extend the props from the base Sidebar and add scenarios
interface LabSidebarProperties extends React.ComponentProps<typeof Sidebar> {
  scenarios: ScenarioSummary[];
}

export function LabSidebar({ scenarios, ...properties }: LabSidebarProperties) {
  const parameters = useParams();
  const selectedId = parameters.id as string;
  const router = useRouter();

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
              <SidebarMenu>
                {scenarios.map((scenario) => {
                  if (!scenario._id) {
                    return;
                  }

                  return (
                    <ScenarioItem
                      scenario={scenario}
                      key={scenario._id.toString()}
                      selected={selectedId === scenario._id.toString()}
                    />
                  );
                })}
              </SidebarMenu>
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

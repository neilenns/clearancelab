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
import { Scenario } from "@workspace/validators";
import { WandSparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ScenarioItem } from "./scenario-item";

// Extend the props from the base Sidebar and add scenarios
interface LabSidebarProperties extends React.ComponentProps<typeof Sidebar> {
  scenarios: Scenario[];
}

export function LabSidebar({ scenarios, ...properties }: LabSidebarProperties) {
  const parameters = useParams();
  const selectedId = parameters.id as string;
  const router = useRouter();

  const onClickHandler = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const randomScenario = scenarios[randomIndex];

    if (randomScenario._id) {
      router.replace(`/lab/${randomScenario._id}`);
    }
  };

  return (
    <aside>
      <Sidebar {...properties}>
        <SidebarHeader>
          <h3>Scenarios</h3>
          <Button onClick={onClickHandler}>
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

"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { ScenarioItem } from "./scenario-item";
import { Scenario } from "@workspace/validators";

// Extend the props from the base Sidebar and add scenarios
interface AppSidebarProperties extends React.ComponentProps<typeof Sidebar> {
  scenarios: Scenario[];
}

export function AppSidebar({ scenarios, ...properties }: AppSidebarProperties) {
  const parameters = useParams();
  const selectedId = parameters.id as string;

  return (
    <aside>
      <Sidebar {...properties}>
        <SidebarHeader>
          <h3>Scenarios</h3>
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

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
import { ScenarioItem } from "./scenarioItem";
import { Scenario } from "@workspace/validators";

// Extend the props from the base Sidebar and add scenarios
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  scenarios: Scenario[];
}

export function AppSidebar({ scenarios, ...props }: AppSidebarProps) {
  const params = useParams();
  const selectedId = params.id as string;

  return (
    <aside>
      <Sidebar {...props}>
        <SidebarHeader>
          <h3>Scenarios</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {scenarios.map((scenario) => {
                  if (!scenario._id) {
                    return null;
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

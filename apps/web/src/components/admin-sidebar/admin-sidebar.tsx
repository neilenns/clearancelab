"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Edit, Home } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {}

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Manage scenarios",
    url: "/admin/",
    icon: Edit,
  },
];

export function AdminSidebar({ ...props }: AdminSidebarProps) {
  return (
    <aside>
      <Sidebar {...props}>
        <SidebarHeader>
          <h3>Admin</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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

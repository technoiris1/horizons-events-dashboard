"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { ChevronDown, CalendarDays, ChartColumnIncreasing, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const analytics = [
  {
    name: "Event Analytics",
    icon: ChartColumnIncreasing,
  },
  {
    name: "Participant Analytics",
    icon: Users,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Select Event"
                  className={`
                    cursor-pointer rounded-lg bg-sidebar-accent/60
                    ring-1 ring-sidebar-border
                    hover:bg-sidebar-accent hover:ring-sidebar-ring
                    transition-colors duration-150
                    ${isCollapsed ? "justify-center px-0" : "px-3 py-2.5"}
                  `}
                >
                  <CalendarDays className="size-4 shrink-0 text-sidebar-primary" />
                  {!isCollapsed && (
                    <>
                      <div className="flex flex-col items-start leading-none ml-1">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50 mb-0.5">
                          Event
                        </span>
                        <span className="text-sm font-semibold text-sidebar-foreground">
                          Select Event
                        </span>
                      </div>
                      <ChevronDown className="ml-auto size-3.5 text-sidebar-foreground/50" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-[--radix-popper-anchor-width]"
                align="start"
              >
                {["Arcana", "Equinox", "Polaris", "Crux", "Europa"].map((event) => (
                  <DropdownMenuItem key={event} className="cursor-pointer">
                    {event}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>


      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Analytics
            </SidebarGroupLabel>
          )}

          <SidebarMenu className="gap-0.5">
            {analytics.map((stat) => (
              <SidebarMenuItem key={stat.name}>
                <SidebarMenuButton
                  tooltip={stat.name}
                  className={`
                    cursor-pointer rounded-md
                    hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                    transition-colors duration-150
                    ${isCollapsed ? "justify-center px-0" : "px-3 py-2"}
                  `}
                >
                  <stat.icon className="size-4 shrink-0" />
                  <span className="font-normal">{stat.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-2 py-3" />
    </Sidebar>
  )
}
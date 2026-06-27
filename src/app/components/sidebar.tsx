"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChartColumnIncreasing,
  ChevronDown,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const analytics = [
  {
    name: "Event Analytics",
    icon: ChartColumnIncreasing,
    href: "/",
  },
  {
    name: "Participant Analytics",
    icon: Users,
    href: "/participants",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

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
                      <div className="ml-1 flex flex-col items-start leading-none">
                        <span className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50">
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
                align="start"
                className="w-[--radix-popper-anchor-width]"
              >
                {["Arcana", "Equinox", "Polaris", "Crux", "Europa"].map(
                  (event) => (
                    <DropdownMenuItem
                      key={event}
                      className="cursor-pointer"
                    >
                      {event}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Analytics
            </SidebarGroupLabel>
          )}

          <SidebarMenu className="gap-0.5">
            {analytics.map((stat) => {
              const active =
                stat.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(stat.href);

              return (
                <SidebarMenuItem key={stat.name}>
                  <SidebarMenuButton
                    asChild
                    tooltip={stat.name}
                    isActive={active}
                    className={`
                      cursor-pointer rounded-md transition-colors duration-150
                      ${isCollapsed ? "justify-center px-0" : "px-3 py-2"}
                    `}
                  >
                    <Link href={stat.href}>
                      <stat.icon className="size-4 shrink-0" />
                      <span>{stat.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-2 py-3" />
    </Sidebar>
  );
}
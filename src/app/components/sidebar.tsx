import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from "@/components/ui/sidebar"

import {ChevronDown, CalendarDays, ChartColumnIncreasing, Users} from 'lucide-react' 
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"



const analytics=[
  {name: "Event Analytics",
    icon: ChartColumnIncreasing
  }

  ,
  
  {name: "Participant Analytics",
    icon: Users
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="cursor-pointer">
            <CalendarDays className="size-4 shrink-0" />
            <span>Select Event</span>
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem className="cursor-pointer">
                  Arcana
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Equinox
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Polaris
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Crux
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Europa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
      <SidebarMenu>
  {analytics.map((stat) => (
    <SidebarMenuItem  key={stat.name}>
      <SidebarMenuButton className="cursor-pointer">
        <stat.icon className="size-4" />
        <span>{stat.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
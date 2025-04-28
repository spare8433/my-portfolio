import { FileUser, GraduationCap, Home, LibraryBig } from "lucide-react";
import type { ReactNode } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface MenuProps {
  title: string;
  url: string;
  icon?: ReactNode;
  variant?: "basic" | "sub";
}

const Projects = [
  { title: "RichCalendar", url: "/projects/rich-calendar" },
  { title: "CareHome", url: "/projects/care-home" },
];

const Menu = ({ title, url, icon, variant = "basic" }: MenuProps) => {
  const isSub = variant === "sub";
  const ItemComponent = isSub ? SidebarMenuSubItem : SidebarMenuItem;
  const ButtonComponent = isSub ? SidebarMenuSubButton : SidebarMenuButton;

  return (
    <ItemComponent>
      <ButtonComponent asChild>
        <a href={url}>
          {icon}
          <span>{title}</span>
        </a>
      </ButtonComponent>
    </ItemComponent>
  );
};

export function AppSidebar() {
  // const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Menu title="홈" url="/home" icon={<Home />} />
          <Menu title="자기소개" url="/introduce" icon={<FileUser />} />
          <Menu title="학력" url="/educational-background" icon={<GraduationCap />} />
          <Menu title="학습" url="/learning" icon={<LibraryBig />} />

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>프로젝트</SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {Projects.map((project) => (
                  <SidebarMenuSub key={project.title}>
                    <Menu variant="sub" {...project} />
                  </SidebarMenuSub>
                ))}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

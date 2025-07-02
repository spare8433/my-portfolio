import { ChevronRight, CodeXml, FileUser, Home, LibraryBig } from "lucide-react";
import { type ReactNode } from "react";

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
}

const Projects = [
  { title: "RichCalendar", url: "/projects/rich-calendar" },
  { title: "CareHome", url: "/projects/care-home" },
];

const Menu = ({ title, url, icon }: MenuProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="[&>svg]:size-6 mb-1.5 gap-x-3 text-base">
        <a href={url} className="h-10 mb-1">
          {icon}
          <b>{title}</b>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SubMenu = ({ title, url, icon }: MenuProps) => {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild className="[&>svg]:size-6 gap-x-3">
        <a href={url} className="h-10 mb-1">
          {icon}
          <b>{title}</b>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarMenu>
          <Menu title="홈" url="/" icon={<Home />} />
          <Menu title="자기소개" url="/about" icon={<FileUser />} />
          <Menu title="학습" url="/learning" icon={<LibraryBig />} />

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="font-bold h-10 [&>svg]:size-6 items-center justify-between mb-1.5">
                  <div className="flex items-center gap-x-3 text-base">
                    <CodeXml />
                    프로젝트
                  </div>
                  <ChevronRight className="text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {Projects.map((project) => (
                  <SidebarMenuSub key={project.title} className="border-l-3">
                    <SubMenu {...project} />
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

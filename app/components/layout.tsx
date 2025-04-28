import { Outlet } from "react-router";

import profileImage from "@/assets/profile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { AppSidebar } from "./side-bar";

export default function Layout() {
  return (
    <div className="flex size-full flex-col relative">
      <div className="absolute size-full overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex-col overflow-hidden">
            <PageHeader />
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

const PageHeader = () => {
  const { open } = useSidebar();

  return (
    <div className="flex justify-between items-center px-4 space-x-2 h-14 border-b">
      <div className="flex space-x-2 items-center">
        {open !== false && <SidebarTrigger className="cursor-pointer size-10.5" />}
        <h1>Chat SBC</h1>
      </div>

      <div>
        <Popover>
          <PopoverTrigger className="flex space-x-2 items-center cursor-pointer">
            <Avatar>
              <AvatarImage src={profileImage} alt="profileImage" />
              <AvatarFallback>profile</AvatarFallback>
            </Avatar>
            <p>ByeongChan</p>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

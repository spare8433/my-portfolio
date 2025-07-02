import { Outlet } from "react-router";

import profileImage from "@/assets/profile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { AppSidebar } from "./side-bar";

export default function Layout() {
  return (
    <div className="size-full">
      <SidebarProvider className="size-full">
        <nav>
          <AppSidebar />
        </nav>

        <div className="flex flex-1 flex-col">
          <PageHeader />
          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

const PageHeader = () => {
  const { open } = useSidebar();

  return (
    <div className="flex justify-between items-center pr-4 pl-3 space-x-2 h-14 border-b">
      <div className="flex space-x-2 items-center">
        <SidebarTrigger className={cn("block md:hidden cursor-pointer size-10.5", !open && "md:block")} />
        <h1>Chat SBC</h1>
      </div>

      <Popover>
        <PopoverTrigger className="flex space-x-2 items-center cursor-pointer drop-shadow-xl rounded-full">
          <Avatar>
            <AvatarImage src={profileImage} alt="profileImage" />
            <AvatarFallback>profile</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-4 w-100 grid grid-cols-[80px_1fr] space-y-3">
          <b>전화번호</b>
          <p>010-8253-2613</p>

          <b>이메일</b>
          <p>byeongchan8433@gmail.com</p>

          <b>GitHub</b>
          <a href="https://github.com/spare8433" className="flex space-x-2 underline">
            https://github.com/spare8433
          </a>

          <b>blog</b>
          <a href="https://spare8433.tistory.com" className="flex space-x-2 underline">
            https://spare8433.tistory.com
          </a>
        </PopoverContent>
      </Popover>
    </div>
  );
};

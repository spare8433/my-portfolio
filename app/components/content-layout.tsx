import React from "react";
import { Outlet } from "react-router";

import Search from "./search";

export default function ContentLayout() {
  return (
    <div className="flex flex-col h-full">
      {/* 콘텐츠 컨터이너 영역 */}
      <div className="h-full overflow-y-auto flex-1 relative flex py-4 px-6 gap-x-4">
        <Outlet />
      </div>

      {/* 검색어 영역 */}
      <div className="h-24 border-t">
        <Search side="top" />
      </div>
    </div>
  );
}

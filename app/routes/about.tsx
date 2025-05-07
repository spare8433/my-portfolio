import React from "react";

import DocViewer from "@/components/md-viewer";
import { Separator } from "@/components/ui/separator";

import about from ".contents/about.md?raw";

function About() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex justify-center relative">
        <div className="absolute  py-4 px-3 w-full flex h-full flex-col items-center space-y-2 overflow-y-auto">
          <div className="max-w-4/5">
            <div className="bg-muted rounded-full self-end px-5 py-2.5">자기 자신을 소개해주세요.</div>
            <Separator className="my-6" />
            <DocViewer content={about} />
          </div>
        </div>
      </div>

      <div className="border-t h-24" />
    </div>
  );
}

export default About;

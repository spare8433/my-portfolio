import StaticHtmlViewer from "@/components/static-html-viewer";
import Toc from "@/components/toc";

interface TocPageProps {
  introText: string;
  htmlPath: string;
  tocPath: string;
}

export default function TocPage({ introText, htmlPath, tocPath }: TocPageProps) {
  return (
    <div className="h-full overflow-y-auto flex-1 relative flex py-4 px-6 gap-x-4">
      <div className="h-full flex flex-col gap-y-8 flex-1">
        <div className="w-fit bg-muted rounded-full self-end px-5 py-2.5">{introText}</div>
        <StaticHtmlViewer path={htmlPath} />
      </div>

      <div className="sticky w-60 top-0 shrink-0">
        <Toc path={tocPath} />
      </div>
    </div>
  );
}

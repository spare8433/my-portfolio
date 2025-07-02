import StaticHtmlViewer from "@/components/static-html-viewer";
import Toc from "@/components/toc";

interface TocPageProps {
  introText: string;
  htmlPath: string;
  tocPath: string;
}

export default function TocPage({ introText, htmlPath, tocPath }: TocPageProps) {
  return (
    <div className="flex-1 h-full relative overflow-y-auto flex gap-x-4 @container">
      <div className="h-full flex flex-col gap-y-8 flex-1 px-6 pt-4">
        <div className="w-fit bg-muted rounded-full self-end px-5 py-2.5">{introText}</div>
        <StaticHtmlViewer path={htmlPath} />
      </div>

      <div className="w-60 top-0 shrink-0 hidden sticky @3xl:block">
        <Toc path={tocPath} />
      </div>
    </div>
  );
}

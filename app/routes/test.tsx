import TocPage from "@/components/toc-page";
import { tocPages } from "@/config/routes";

function Test() {
  const { introText, tocPath, htmlPath } = tocPages.test;
  return <TocPage introText={introText} tocPath={tocPath} htmlPath={htmlPath} />;
}

export default Test;

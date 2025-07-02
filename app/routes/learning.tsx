import TocPage from "@/components/toc-page";
import { tocPages } from "@/config/routes";

function Learning() {
  const { introText, tocPath, htmlPath } = tocPages.learning;
  return <TocPage introText={introText} tocPath={tocPath} htmlPath={htmlPath} />;
}

export default Learning;

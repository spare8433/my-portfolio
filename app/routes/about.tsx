import TocPage from "@/components/toc-page";
import { tocPages } from "@/constants";

function About() {
  const { introText, tocPath, htmlPath } = tocPages.about;
  return <TocPage introText={introText} tocPath={tocPath} htmlPath={htmlPath} />;
}

export default About;

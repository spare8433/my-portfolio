import { useEffect, useState } from "react";

function StaticHtmlViewer({ path }: { path: string }) {
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((text) => setHtmlContent(text))
      .catch((error) => console.error("Error loading HTML:", error));
  }, [path]);
  return (
    <div
      className="prose-sm md:prose md:max-w-full lg:prose-lg max-w-full pl-3"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default StaticHtmlViewer;

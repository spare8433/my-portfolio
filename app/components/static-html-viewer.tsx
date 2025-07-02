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
      className="prose-sm md:prose md:max-w-full prose max-w-full pl-3 pb-8 prose-th:first:w-28 prose-th:first:min-w-28 prose-th:w-auto prose-td:w-auto"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default StaticHtmlViewer;

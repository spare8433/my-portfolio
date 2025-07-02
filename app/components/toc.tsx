import { useEffect, useState } from "react";

function Toc({ path }: { path: string }) {
  const [TOCContent, setTOCContent] = useState<HeadingType[]>([]);
  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((data) => setTOCContent(JSON.parse(data) as HeadingType[]))
      .catch((error) => console.error("Error loading TOC:", error));
  }, [path]);

  return (
    <nav className="max-w-xs p-4 rounded-md overflow-auto h-full">
      <ul className="space-y-1 border-l">
        {TOCContent.map(({ path, depth, text }) => {
          return (
            <li key={path}>
              <a
                href={path}
                className="text-sm py-0.75 font-normal text-muted-foreground block transition-colors hover:text-foreground hover:font-semibold hover:border-foreground hover:border-l-2"
                style={{ paddingLeft: `${depth * 16}px` }}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Toc;

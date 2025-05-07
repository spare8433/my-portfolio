import ReactMarkdown from "react-markdown";

export default function DocViewer({ content }: { content: string }) {
  return (
    <div className="prose max-w-3xl p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

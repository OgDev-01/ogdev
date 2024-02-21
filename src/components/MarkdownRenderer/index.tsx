"use client";
import Markdown from "react-markdown";
import CodeBlock from "../CodeBlock";

interface MarkdownRendererProps {
  content: string;
}
const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <Markdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
            />
          ) : (
            <CodeBlock
              value={String(children).replace(/\n$/, "")}
              language="javascript"
            />
          );
        },
      }}
      className="prose max-w-none lg:prose-lg dark:prose-invert break-words"
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;

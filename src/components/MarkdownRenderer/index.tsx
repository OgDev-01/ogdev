"use client";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import CodeBlock from "../CodeBlock";

interface MarkdownRendererProps {
  content: string;
}
const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline =
            typeof children === "string" && !children.endsWith("\n");

          if (isInline)
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );

          return (
            <CodeBlock
              language={!match ? "javascript" : match[1]}
              value={String(children).replace(/\n$/, "")}
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

import { useMemo } from "react";
import remarkGfm from "remark-gfm";
import Markdown, { Components } from "react-markdown";

import CodeBlock from "../CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const components = useMemo<Components>(
    () => ({
      code({ className, children, ...props }) {
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
    }),
    []
  );

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className="prose max-w-none lg:prose-lg dark:prose-invert break-words prose-img:rounded-lg prose-code:bg-secondary-black/10 prose-code:px-0.5 prose-code:rounded-md prose-code:pt-0.5 prose-code:dark:bg-highlight-grey/20"
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;

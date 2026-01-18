import { useMemo, memo } from "react";
import remarkGfm from "remark-gfm";
import Markdown, { Components } from "react-markdown";

import CodeBlock from "../CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

// Memoize the remark plugins array outside component to prevent recreation
const remarkPlugins = [remarkGfm];

// Generate slug from heading text for anchor links
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const MarkdownRenderer = memo(({ content }: MarkdownRendererProps) => {
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
      // Add IDs to headings for TOC navigation
      h1({ children, ...props }) {
        const text = String(children);
        const id = slugify(text);
        return (
          <h1 id={id} {...props}>
            {children}
          </h1>
        );
      },
      h2({ children, ...props }) {
        const text = String(children);
        const id = slugify(text);
        return (
          <h2 id={id} {...props}>
            {children}
          </h2>
        );
      },
      h3({ children, ...props }) {
        const text = String(children);
        const id = slugify(text);
        return (
          <h3 id={id} {...props}>
            {children}
          </h3>
        );
      },
    }),
    []
  );

  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      components={components}
      className="prose max-w-none dark:prose-invert prose-img:rounded-lg"
    >
      {content}
    </Markdown>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;

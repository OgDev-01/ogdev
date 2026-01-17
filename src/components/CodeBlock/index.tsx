import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { MdContentCopy } from "react-icons/md";

interface CodeBlockProps {
  value: string;
  language?: string;
}

// Map common language aliases to prism-react-renderer supported languages
const normalizeLanguage = (lang: string): string => {
  const languageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "tsx",
    tsx: "tsx",
    typescript: "typescript",
    javascript: "javascript",
    json: "json",
    html: "markup",
    xml: "markup",
    css: "css",
    scss: "css",
    bash: "bash",
    sh: "bash",
    shell: "bash",
    python: "python",
    py: "python",
    ruby: "ruby",
    rb: "ruby",
    go: "go",
    rust: "rust",
    sql: "sql",
    yaml: "yaml",
    yml: "yaml",
    markdown: "markdown",
    md: "markdown",
    diff: "diff",
    graphql: "graphql",
  };

  return languageMap[lang.toLowerCase()] || "tsx";
};

const CodeBlock = ({ value, language = "javascript" }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const normalizedLanguage = normalizeLanguage(language);

  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
      setIsCopied(true);
    } catch (e) {
      //eslint-disable-next-line no-console
      console.log(e);
    }
  };

  // This resets the copied state for the highlighted code block after copying
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="relative group my-6">
      {/* Copy button */}
      {!isCopied ? (
        <button
          onClick={() => copyToClipboard(value)}
          aria-label="Copy code to clipboard"
          className="absolute right-3 top-3 z-10 rounded-md bg-primary-white/10 p-2 opacity-0 transition-opacity hover:bg-primary-white/20 group-hover:opacity-100"
        >
          <MdContentCopy className="text-lg text-primary-white/70" />
        </button>
      ) : (
        <span className="absolute right-3 top-3 z-10 rounded-md bg-primary-button/20 px-2 py-1 text-xs font-medium text-primary-button dark:bg-secondary-button/20 dark:text-secondary-button">
          Copied!
        </span>
      )}

      {/* Code block */}
      <Highlight
        theme={themes.nightOwl}
        code={value}
        language={normalizedLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto rounded-lg text-sm leading-relaxed`}
            style={{
              ...style,
              padding: "1.25rem 1.5rem", // py-5 px-6 equivalent
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;

import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  value: string;
  language?: string;
}
const CodeBlock = ({ value, language = undefined }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
      setIsCopied(true);
    } catch (e) {
      //eslint-disable-next-line no-console
      console.log(e);
    }
  };

  // This resets the copied state for the highlighed code block after copying
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  return (
    <div className="relative">
      {!isCopied ? (
        <button
          onClick={() => copyToClipboard(value)}
          aria-label="Copy code to clipboard"
          className="absolute right-0 p-2 rounded-md opacity-40 hover:opacity-100 transition hover:bg-secondary-black/10"
        >
          <MdContentCopy className="text-xl" />
        </button>
      ) : (
        <span className="absolute right-0 p-2 rounded-md text-xs opacity-40 hover:opacity-100 transition hover:bg-secondary-black/10">
          Copied
        </span>
      )}
      <SyntaxHighlighter language={language} style={coldarkDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

"use client";

import { useEffect, useState, useMemo } from "react";
import { FiList } from "react-icons/fi";

import { cn } from "@/libs/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

// Generate slug from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Extract headings from markdown content
function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Only include h2 and h3 (skip h1 as it's usually the title)
    if (level >= 2 && level <= 3) {
      headings.push({
        id: slugify(text),
        text,
        level,
      });
    }
  }

  return headings;
}

const TableOfContents = ({ content, className }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  const headings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all headings in the document
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) {
    return null; // Don't show TOC for very short articles
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsExpanded(false); // Collapse on mobile after clicking
    }
  };

  return (
    <nav
      className={cn(
        "rounded-lg border border-secondary-black/10 bg-secondary-black/[0.02] p-4 dark:border-primary-white/10 dark:bg-primary-white/[0.02]",
        className
      )}
      aria-label="Table of contents"
    >
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between gap-2 text-sm font-medium text-secondary-black dark:text-primary-white lg:hidden"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2">
          <FiList className="h-4 w-4" aria-hidden="true" />
          Table of Contents
        </span>
        <span
          className={cn(
            "text-xs transition-transform",
            isExpanded && "rotate-180"
          )}
        >
          ▼
        </span>
      </button>

      {/* Desktop header */}
      <h2 className="mb-3 hidden items-center gap-2 text-sm font-medium text-secondary-black dark:text-primary-white lg:flex">
        <FiList className="h-4 w-4" aria-hidden="true" />
        Table of Contents
      </h2>

      {/* TOC list */}
      <ul
        className={cn(
          "mt-3 space-y-1 overflow-hidden transition-all duration-200 lg:mt-0 lg:max-h-none lg:opacity-100",
          isExpanded
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 lg:opacity-100"
        )}
      >
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <button
              onClick={() => handleClick(id)}
              className={cn(
                "block w-full text-left text-sm transition-colors hover:text-primary-button dark:hover:text-secondary-button",
                level === 3 && "pl-4",
                activeId === id
                  ? "font-medium text-primary-button dark:text-secondary-button"
                  : "text-secondary-black/60 dark:text-primary-white/60"
              )}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

TableOfContents.displayName = "TableOfContents";

export default TableOfContents;

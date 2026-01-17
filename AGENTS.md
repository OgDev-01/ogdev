# AGENTS.md - AI Coding Agent Guidelines

This document provides guidelines for AI coding agents working in this TanStack Start portfolio/blog codebase.

## Project Overview

- **Framework**: TanStack Start 1.150.0 (Vite-powered)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js >= 20.8.1
- **React**: React 19
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography
- **Build Tool**: Vite 7
- **Deployment**: Coolify on Hostinger VPS (Node.js server)

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start Vite dev server

# Build
npm run build            # Production build (Vite + TypeScript check)

# Preview
npm run preview          # Preview production build locally

# Start
npm run start            # Run production server

# Linting & Formatting
npm run lint             # Run ESLint
npm run format           # Run ESLint with auto-fix
```

## Directory Structure

```
src/
├── routes/                 # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout (nav, footer, providers)
│   ├── index.tsx          # Home page (/)
│   ├── about/             # About page routes
│   ├── blog/              # Blog pages (/blog, /blog/$slug)
│   └── projects/          # Project pages (/projects, /projects/$slug)
├── components/            # React components
│   ├── shared/            # Reusable UI components
│   ├── BlogCard/          # Blog card component
│   ├── ProjectCard/       # Project card component
│   └── MarkdownRenderer/  # Markdown rendering component
├── server/                # Server functions (TanStack Start)
│   └── blogs.ts           # DEV.to API server functions
├── data/                  # Static data
│   └── projects.ts        # Project data
├── libs/                  # Shared utilities and hooks
│   ├── context/           # React contexts (theme)
│   ├── hooks/             # Custom React hooks
│   └── helpers/           # Helper functions
├── styles/                # Global styles
│   └── globals.css        # Tailwind v4 CSS config
└── router.tsx             # Router configuration
```

## Code Style Guidelines

### Import Order (enforced by ESLint)

Imports must follow this order:

1. Built-in modules (node:)
2. External packages (react, @tanstack, etc.)
3. Internal modules (@/...)
4. Object imports
5. Type imports
6. Index imports
7. Parent imports (..)
8. Sibling imports (.)

```typescript
// Example
import { createFileRoute } from "@tanstack/react-router";

import { getBlogs } from "@/server/blogs";
import BlogCard from "@/components/BlogCard";
import type { Blog } from "@/server/blogs";
```

### Path Aliases

Use `@/*` for src-relative imports:

```typescript
import { cn } from "@/libs/utils";
import Button from "@/components/shared/Button/Button";
```

### Formatting (Prettier)

- **Tab width**: 2 spaces
- **Quotes**: Double quotes (not single)
- **Trailing commas**: ES5 style
- **JSX quotes**: Double quotes

### TypeScript

- Strict mode is enabled
- Types/Interfaces must be PascalCase
- Use `type` imports for type-only imports: `import type { Foo } from "..."`

### Naming Conventions

| Element            | Convention               | Example                  |
| ------------------ | ------------------------ | ------------------------ |
| Files (components) | PascalCase in folder     | `Button/Button.tsx`      |
| Files (utilities)  | camelCase                | `fetcher.ts`             |
| Files (routes)     | lowercase with $params   | `$slug.tsx`              |
| React components   | PascalCase               | `Button`, `AppNav`       |
| Functions          | camelCase                | `getAllProjects`         |
| Types/Interfaces   | PascalCase               | `Project`, `ButtonProps` |
| CSS classes        | Tailwind utility classes | -                        |

### React Component Patterns

1. Use `React.forwardRef` for components that need ref forwarding
2. Always set `displayName` on forwardRef components
3. Use `class-variance-authority` (cva) for variant styling
4. Use `cn()` utility for merging Tailwind classes
5. Default export components

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;
```

### TanStack Router Patterns

#### File-based Routes

```typescript
// src/routes/blog/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const blogs = await getBlogs({ data: { limit: 20 } });
    return { blogs };
  },
  component: BlogPage,
});

function BlogPage() {
  const { blogs } = Route.useLoaderData();
  return <div>{/* ... */}</div>;
}
```

#### Dynamic Routes

```typescript
// src/routes/blog/$slug.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const blog = await getBlogById({ data: { id: params.slug } });
    return { blog };
  },
  component: BlogDetailPage,
});
```

#### Navigation

```typescript
import { Link, useLocation, useRouter } from "@tanstack/react-router";

// Link component
<Link to="/about">About</Link>
<Link to="/blog/$slug" params={{ slug: "my-post" }}>Read Post</Link>

// Hooks
const { pathname } = useLocation();
const router = useRouter();
router.history.back();
```

### Server Functions (TanStack Start)

```typescript
// src/server/blogs.ts
import { createServerFn } from "@tanstack/react-start";

export const getBlogs = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number }) => data)
  .handler(async ({ data }) => {
    const response = await fetch("https://dev.to/api/articles?username=...");
    return response.json();
  });
```

### Tailwind CSS v4

Use the new `@utility` directive for custom utilities:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 15px;
  max-width: 100%;

  @media (min-width: 540px) {
    max-width: 540px;
  }
}
```

### Error Handling

- Use try/catch blocks in async functions
- Server functions should throw errors for error states
- Use TanStack Router's error boundaries for route-level errors

### Forbidden Patterns

- **No console.log**: Use `//eslint-disable-next-line no-console` if absolutely needed
- **No debugger statements**: Will fail lint
- **No unused imports**: Auto-removed by lint
- **No Next.js imports**: This is a TanStack Start project

## Environment Variables

Required environment variables (set in `.env`):

- `DEV_TO_API_KEY` - DEV.to API key for fetching blog posts

## CI/CD

- PRs run lint checks via GitHub Actions (`.github/workflows/development.yml`)
- Releases use semantic-release with conventional commits
- Follow conventional commit format: `feat:`, `fix:`, `docs:`, etc.
- Deployment via Coolify on Hostinger VPS

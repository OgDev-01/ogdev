/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import SpotlightProvider from "@/components/SpotlightProvider/SpotlightProvider";
import { ThemeProvider } from "@/libs/context/theme";
import appCss from "@/styles/globals.css?url";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 60 * 60 * 1000, // 1 hour (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

const SITE_URL = "https://www.ogbonna.dev";
const SITE_NAME = "Sunday Ogbonna";
const SITE_TITLE = "Sunday Ogbonna - Software Engineer";
const SITE_DESCRIPTION =
  "Sunday Ogbonna is a software engineer who builds accessible, pixel-perfect digital experiences for the web and mobile.";
const SITE_IMAGE = `${SITE_URL}/og/png?title=${encodeURIComponent("Sunday Ogbonna")}&subtitle=${encodeURIComponent("Software Engineer | Building modern web experiences")}`;
const TWITTER_HANDLE = "@OgDev_01";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Sunday Ogbonna, Software Engineer, Fullstack Developer, Javascript Developer, React Developer, Next.js Developer, Node.js Developer, Mobile Developer, React Native",
      },
      // Open Graph
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: SITE_IMAGE },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_IMAGE },
      { name: "twitter:image:alt", content: SITE_TITLE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "canonical", href: SITE_URL },
      // Fonts
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&family=Inter:wght@100..900&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();

  // Disable custom cursor on blog detail pages
  const isBlogDetailPage = /^\/blog\/[^/]+$/.test(location.pathname);

  const content = (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#content"
        className="absolute left-0 top-0 block -translate-x-full rounded bg-primary-button px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
      >
        Skip to Content
      </a>

      {/* Floating theme toggle - visible on all pages */}
      <div className="fixed right-6 top-6 z-50 md:right-8 md:top-8">
        <ThemeToggle variant="floating" />
      </div>

      <main id="content" className="min-h-screen">
        <Outlet />
      </main>
    </>
  );

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {isBlogDetailPage ? (
            content
          ) : (
            <SpotlightProvider>{content}</SpotlightProvider>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </RootDocument>
  );
}

// Inline script to prevent theme flash - runs before React hydrates
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

// WebSite JSON-LD Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sunday Ogbonna",
  url: "https://www.ogbonna.dev",
  author: {
    "@type": "Person",
    name: "Sunday Ogbonna",
  },
};

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-inter bg-primary-white dark:bg-secondary-black text-secondary-black dark:text-primary-white antialiased selection:bg-primary-button/30 dark:selection:bg-secondary-button/30">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

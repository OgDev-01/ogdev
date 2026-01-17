/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import BackButton from "@/components/BackButton";
import AppNav from "@/components/shared/AppNav/AppNav";
import Footer from "@/components/shared/Footer/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { ThemeProvider } from "@/libs/context/theme";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ogbonna Sunday" },
      {
        name: "description",
        content:
          "Meticulous software engineer with a passion for building products",
      },
      {
        name: "keywords",
        content:
          "Ogbonna Sunday, Software Engineer, Fullstack Developer, Javascript Developer, React Developer, Next.js Developer, Node.js Developer",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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
  return (
    <RootDocument>
      <ThemeProvider>
        <AppNav />
        <BackButton />
        <PageTitle />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
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

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-chivo bg-primary-white dark:bg-secondary-black text-secondary-black dark:text-primary-white transition-colors duration-200 ease-in-out overflow-x-hidden">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

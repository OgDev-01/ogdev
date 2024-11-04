import { ClerkProvider } from "@clerk/nextjs";
import { Chivo_Mono } from "next/font/google";

import { cn } from "@/libs/utils";
import AppNav from "@/components/shared/AppNav/AppNav";
import Footer from "@/components/shared/Footer/Footer";
import BackButton from "@/components/BackButton";
import PageTitle from "@/components/shared/PageTitle";

import "./globals.css";
import "@mdxeditor/editor/style.css";
import type { Metadata } from "next";

import Provider from "./theme-provider";

const chivoMono = Chivo_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ogbonna.dev"),
  title: {
    default: "Ogbonna Sunday",
    template: `%s | Ogbonna Sunday`,
  },
  description:
    "Meticulous software engineer with a passion for building products",
  keywords: [
    "Ogbonna Sunday",
    "Software Engineer",
    "Fullstack Developer",
    "Javascript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Jamstack Developer",
    "MERN Stack Developer",
    "PWA Developer",
    "Web Developer",
    "Frontend Developer",
    "Open Source Developer",
    "Tech Blogger",
    "Technical Writer",
    "Javascript",
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
  ],
  referrer: "origin-when-cross-origin",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            chivoMono.className,
            "bg-primary-white dark:bg-secondary-black text-secondary-black dark:text-primary-white transition-colors duration-200 ease-in-out overflow-x-hidden"
          )}
        >
          <Provider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <AppNav />
            <BackButton />
            <PageTitle />
            <main className="pt-10 pb-24">{children}</main>
            <Footer />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

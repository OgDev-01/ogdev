"use client";

import { BiMoon } from "react-icons/bi";
import { LuSunDim } from "react-icons/lu";

import ClientOnly from "@/components/shared/ClientOnly/ClientOnly";
import { useTheme } from "@/libs/context/theme";
import { cn } from "@/libs/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "floating";
}

function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const baseStyles =
    "group relative flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-button dark:focus-visible:ring-secondary-button";

  const variantStyles = {
    default:
      "rounded-xl bg-highlight-grey p-2 hover:bg-primary-button/20 dark:bg-primary-white/10 dark:hover:bg-secondary-button/20",
    floating:
      "h-10 w-10 rounded-full bg-primary-white/80 shadow-lg shadow-secondary-black/5 backdrop-blur-md hover:bg-primary-white hover:shadow-xl dark:bg-secondary-black/80 dark:shadow-primary-white/5 dark:hover:bg-secondary-black border border-secondary-black/10 dark:border-primary-white/10",
  };

  return (
    <ClientOnly>
      <button
        type="button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        onClick={toggleTheme}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {/* Icon container with rotation animation */}
        <span className="relative h-5 w-5">
          {/* Sun icon - visible in dark mode */}
          <LuSunDim
            className={cn(
              "absolute inset-0 h-5 w-5 text-primary-white transition-all duration-300",
              theme === "light"
                ? "rotate-0 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            )}
            aria-hidden="true"
          />
          {/* Moon icon - visible in light mode */}
          <BiMoon
            className={cn(
              "absolute inset-0 h-5 w-5 text-secondary-black transition-all duration-300",
              theme === "light"
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            )}
            aria-hidden="true"
          />
        </span>
      </button>
    </ClientOnly>
  );
}

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;

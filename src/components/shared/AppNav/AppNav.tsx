"use client";

import Link from "next/link";

import { BiMoon } from "react-icons/bi";
import { LuSunDim } from "react-icons/lu";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AppLogo from "../AppLogo/AppLogo";

const AppNav = () => {
  return (
    <header>
      <nav
        role="navigation"
        className="flex items-center justify-between container py-6"
      >
        <Link href="/">
          <AppLogo />
        </Link>

        <div className="flex items-center gap-10 md:gap-20">
          <ThemeSwitcher />

          <HamburguerMenu />
        </div>
      </nav>

      <div></div>
    </header>
  );
};

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <button
      role="theme-switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-highlight-grey dark:bg-primary-white/25 max-md:hidden p-2 rounded-xl"
    >
      {theme === "light" ? (
        <BiMoon className="text-2xl" />
      ) : (
        <LuSunDim className="text-2xl" />
      )}
    </button>
  );
};

const HamburguerMenu = () => {
  const { theme } = useTheme();
  return (
    <button className="flex items-center font-bold gap-4">
      <span className="text-base md:text-2xl">Menu</span>
      {/* Mobile version */}
      <svg
        width="30"
        height="21"
        viewBox="0 0 30 21"
        fill="none"
        className="md:hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="0.5"
          width="30"
          height="4"
          rx="2"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
        <rect
          x="10"
          y="8.5"
          width="20"
          height="4"
          rx="2"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
        <rect
          x="20"
          y="16.5"
          width="10"
          height="4"
          rx="2"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
      </svg>

      {/* Desktop version */}
      <svg
        width="55"
        height="35"
        viewBox="0 0 65 40"
        fill="none"
        className="hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="60"
          height="8"
          rx="4"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
        <rect
          x="20"
          y="16"
          width="40"
          height="8"
          rx="4"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
        <rect
          x="40"
          y="32"
          width="20"
          height="8"
          rx="4"
          fill={theme === "dark" ? "#FEFEFE" : "#0A0A0A"}
        />
      </svg>
    </button>
  );
};

export default AppNav;

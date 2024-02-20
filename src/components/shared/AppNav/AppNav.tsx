"use client";
import { useState } from "react";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { BiMoon } from "react-icons/bi";
import { LuSunDim } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";
import { cn } from "@/libs/utils";
import AppLogo from "../AppLogo/AppLogo";
import ClientOnly from "../ClientOnly/ClientOnly";
import Button from "../Button/Button";
import Socials from "../Socials/Socials";

export const NavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Snippets", href: "/snippets" },
];

const AppNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = (value: boolean) => {
    setIsOpen(value);
  };

  const getActiveClass = (href: string) => {
    return pathname === href ? "opacity-70" : "";
  };
  return (
    <header>
      <DropdownMenuPrimitive.Root
        onOpenChange={(value) => handleToggleDropdown(value)}
        open={isOpen}
      >
        <nav
          role="navigation"
          className="flex items-center justify-between container py-6 relative"
        >
          <Link href="/">
            <AppLogo />
          </Link>

          <div>
            <ul className="hidden md:flex gap-8 items-center">
              {NavLinks.map(({ label, href }, i) => (
                <li
                  className={cn(
                    pathname === href ? "border-b border-black/40" : ""
                  )}
                  key={i}
                >
                  <Link className={cn(getActiveClass(href))} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
              <ThemeSwitcher />
              <UserButton />
            </ul>
          </div>

          <div className="flex md:hidden items-center gap-4 md:gap-10">
            <ThemeSwitcher />
            <UserButton />
            <DropdownMenuPrimitive.Trigger className="focus-visible:outline-none">
              <HamburguerMenu />
            </DropdownMenuPrimitive.Trigger>
          </div>
        </nav>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            className="bg-primary-white/30 dark:bg-secondary-black/30 z-50 w-[100vw] md:w-[35vw] backdrop-blur-lg min-h-[calc(100vh)] py-14"
            sideOffset={-55}
            align="end"
          >
            <div className="container md:px-6">
              <IoClose
                onClick={() => handleToggleDropdown(false)}
                role="button"
                aria-label="Close menu"
                className="text-3xl ml-auto"
              />

              <ul
                className="flex flex-col gap-8 mt-4 md:mt-16 items-center"
                role="menu"
              >
                {NavLinks.map(({ label, href }, i) => (
                  <DropdownMenuPrimitive.Item
                    className="text-center font-semibold text-base md:text-3xl border-none flex select-none hover:outline-none hover:opacity-50 transition focus-visible:outline-secondary-button"
                    key={i}
                    asChild
                  >
                    <Link href={href}>{label}</Link>
                  </DropdownMenuPrimitive.Item>
                ))}
              </ul>
              <div className="mt-16 md:mt-16 flex flex-col gap-4 md:gap-10 text-center items-center">
                <p className="uppercase opacity-40 font-semibold text-xl">
                  Say Hello
                </p>
                <Button className="mx-auto md:text-3xl">
                  hello@ogbonna.dev
                </Button>
                <div className="mt-6">
                  <Socials />
                </div>
              </div>
            </div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </header>
  );
};

const ThemeSwitcher = ({ classNames }: { classNames?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ClientOnly>
      <button
        role="theme-switcher"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "bg-highlight-grey dark:bg-primary-white/10 p-1.5 md:p-2 rounded-xl",
          classNames
        )}
      >
        {theme === "light" ? (
          <BiMoon className="text-lg md:text-2xl" />
        ) : (
          <LuSunDim className="text-lg md:text-2xl" />
        )}
      </button>
    </ClientOnly>
  );
};

const HamburguerMenu = () => {
  const { theme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      title="Toggle theme"
      className="flex items-center font-bold gap-3"
    >
      <span className="text-base md:text-xl max-md:hidden">Menu</span>
      {/* Mobile version */}
      <ClientOnly>
        <svg
          width="30"
          height="18"
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
          height="28"
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
      </ClientOnly>
    </button>
  );
};

export default AppNav;

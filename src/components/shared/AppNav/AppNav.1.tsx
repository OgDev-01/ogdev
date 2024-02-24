"use client";
import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";
import AppLogo from "../AppLogo/AppLogo";
import Button from "../Button/Button";
import Socials from "../Socials/Socials";
import { NavLinks, ThemeSwitcher, HamburguerMenu } from "./AppNav";

export const AppNav = () => {
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
          className="flex items-center justify-between container relative py-4"
        >
          <Link className="" href="/">
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

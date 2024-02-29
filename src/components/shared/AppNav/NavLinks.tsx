"use client";

import Link from "next/link";
import { NavLinks } from "./AppNav";

const NavLink = () => {
  return (
    <>
      {NavLinks.map((link, i) => (
        <Link key={i} href={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLink;

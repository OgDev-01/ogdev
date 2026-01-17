import { Link } from "@tanstack/react-router";

import { NavLinks } from "./AppNav";

const NavLink = () => {
  return (
    <>
      {NavLinks.map((link) => (
        <Link key={link.href} to={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLink;

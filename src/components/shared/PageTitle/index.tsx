import { useLocation } from "@tanstack/react-router";

import Title from "../Typography/Title";

export const ignoredPaths = ["/", "/sign-in", "/sign-up", "/dashboard"];

const PageTitle = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/");

  if (ignoredPaths.includes(pathname) || segments.length > 2) {
    return null;
  }

  const title = segments[1].charAt(0).toUpperCase() + segments[1].slice(1);

  return (
    <div className="container">
      <Title className="text-3xl md:text-5xl text-center py-4">{title}</Title>
    </div>
  );
};

export default PageTitle;

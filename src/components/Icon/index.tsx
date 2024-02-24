import React from "react";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiVercel,
  SiPostgresql,
  SiNestjs,
  SiStorybook,
  SiNetlify,
  SiFigma,
  SiGithub,
  SiJest,
  SiMongodb,
  SiCypress,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";

interface IconProps {
  name: Technology;
}
export type Technology =
  | "react"
  | "javascript"
  | "typescript"
  | "tailwind"
  | "node.js"
  | "aws"
  | "graphql"
  | "prisma"
  | "postgresql"
  | "mongodb"
  | "vercel"
  | "netlify"
  | "jest"
  | "cypress"
  | "storybook"
  | "figma"
  | "github"
  | "nestjs"
  | "next.js";
const Icon = ({ name }: IconProps) => {
  const iconMap: Record<Technology, JSX.Element> = {
    react: <FaReact />,
    javascript: <IoLogoJavascript />,
    typescript: <SiTypescript />,
    tailwind: <SiTailwindcss />,
    "node.js": <DiNodejsSmall />,
    aws: <FaAws />,
    graphql: <GrGraphQl />,
    prisma: <SiPrisma />,
    vercel: <SiVercel />,
    postgresql: <SiPostgresql />,
    nestjs: <SiNestjs />,
    "next.js": <TbBrandNextjs />,
    storybook: <SiStorybook />,
    netlify: <SiNetlify />,
    figma: <SiFigma />,
    github: <SiGithub />,
    jest: <SiJest />,
    mongodb: <SiMongodb />,
    cypress: <SiCypress />,
  };
  return <>{iconMap[name]}</>;
};

export default Icon;

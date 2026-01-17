export interface Project {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  cover_image: string;
  content: string;
  project_link: string;
  start_date: string;
  end_date: string;
  tags?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "OpenSauced",
    slug: "opensauced",
    subtitle: "Open source intelligence platform for developers",
    cover_image:
      "https://res.cloudinary.com/ogbonnasunday/image/upload/v1704736587/opensauced-cover_sjljvd.png",
    content: `
OpenSauced is an open source intelligence platform that helps developers find the best open source projects to contribute to.
It provides insights into repositories, tracks contributions, and helps maintainers grow their communities.

## Key Features
- Repository insights and analytics
- Contribution tracking
- Community growth tools
- Highlight system for showcasing work

## Technologies Used
- Next.js
- TypeScript
- PostgreSQL
- Tailwind CSS
    `,
    project_link: "https://opensauced.pizza",
    start_date: "2022-01-01",
    end_date: "2024-01-01",
    tags: "Next.js,TypeScript,PostgreSQL,Tailwind",
  },
  {
    id: 2,
    title: "Portfolio Website",
    slug: "portfolio-website",
    subtitle: "Personal portfolio and blog website",
    cover_image:
      "https://res.cloudinary.com/ogbonnasunday/image/upload/v1704736587/portfolio-cover_sjljvd.png",
    content: `
A personal portfolio website showcasing my projects, blog posts, and professional experience.

## Key Features
- Blog integration with DEV.to
- Project showcase
- Contact form
- Dark mode support

## Technologies Used
- TanStack Start
- React 19
- Tailwind CSS v4
- TypeScript
    `,
    project_link: "https://ogbonna.dev",
    start_date: "2024-01-01",
    end_date: "2024-12-01",
    tags: "TanStack,React,TypeScript,Tailwind",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import FadeIn from "@/components/FadeIn/FadeIn";
import { projects } from "@/data/experience";

const SITE_URL = "https://www.ogbonna.dev";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects - Sunday Ogbonna" },
      {
        name: "description",
        content:
          "Featured projects and work by Sunday Ogbonna, including web applications, mobile apps, and open-source contributions.",
      },
      { property: "og:title", content: "Projects - Sunday Ogbonna" },
      {
        property: "og:description",
        content:
          "Featured projects and work by Sunday Ogbonna, including web applications, mobile apps, and open-source contributions.",
      },
      { property: "og:url", content: `${SITE_URL}/projects` },
      {
        property: "og:image",
        content: `${SITE_URL}/og/png?title=${encodeURIComponent("Projects")}&subtitle=${encodeURIComponent("Web applications, mobile apps, and open-source")}`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projects - Sunday Ogbonna" },
      {
        name: "twitter:description",
        content:
          "Featured projects and work by Sunday Ogbonna, including web applications, mobile apps, and open-source contributions.",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/og/png?title=${encodeURIComponent("Projects")}&subtitle=${encodeURIComponent("Web applications, mobile apps, and open-source")}`,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/projects` }],
  }),
  component: Projects,
});

function Projects() {
  // Sort projects by year descending
  const sortedProjects = [...projects].sort(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      {/* Header */}
      <header className="mb-12">
        <FadeIn delay={0} direction="down">
          <Link
            to="/"
            className="group mb-6 inline-flex items-center text-sm font-medium text-secondary-black/70 transition-colors hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
          >
            <FiArrowLeft
              className="mr-2 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Sunday Ogbonna
          </Link>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-black dark:text-primary-white sm:text-5xl">
            All Projects
          </h1>
        </FadeIn>
      </header>

      {/* Projects Table */}
      <FadeIn delay={200}>
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-secondary-black/10 bg-primary-white/75 px-6 py-5 backdrop-blur-sm dark:border-primary-white/10 dark:bg-secondary-black/75">
            <tr>
              <th className="py-4 pl-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white">
                Year
              </th>
              <th className="py-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white">
                Project
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white md:table-cell">
                Made at
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white lg:table-cell">
                Built with
              </th>
              <th className="py-4 text-sm font-semibold text-secondary-black dark:text-primary-white">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project, index) => (
              <tr
                key={index}
                className="border-b border-secondary-black/5 transition-colors hover:bg-secondary-black/5 dark:border-primary-white/5 dark:hover:bg-primary-white/5"
              >
                {/* Year */}
                <td className="py-4 pl-4 pr-8 align-top text-sm text-secondary-black/60 dark:text-primary-white/60">
                  {project.year}
                </td>

                {/* Project Name */}
                <td className="py-4 pr-8 align-top font-medium text-secondary-black dark:text-primary-white">
                  {project.title}
                </td>

                {/* Made at */}
                <td className="hidden py-4 pr-8 align-top text-sm text-secondary-black/60 dark:text-primary-white/60 md:table-cell">
                  {project.madeAt || "—"}
                </td>

                {/* Built with */}
                <td className="hidden py-4 pr-8 align-top lg:table-cell">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li key={tech}>
                        <span className="rounded-full bg-primary-button/10 px-2.5 py-1 text-xs font-medium text-primary-button dark:bg-secondary-button/10 dark:text-secondary-button">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>

                {/* Links */}
                <td className="py-4 align-top">
                  <div className="flex items-center gap-3">
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center text-sm text-secondary-black/70 transition-colors hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                        aria-label={`Visit ${project.title} (opens in new tab)`}
                      >
                        <span className="hidden sm:inline">
                          {new URL(project.link).hostname.replace("www.", "")}
                        </span>
                        <FiArrowUpRight
                          className="ml-1 h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-black/50 transition-colors hover:text-primary-button dark:text-primary-white/50 dark:hover:text-secondary-button"
                        aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeIn>
    </div>
  );
}

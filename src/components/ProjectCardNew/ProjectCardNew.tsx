import { Link } from "@tanstack/react-router";
import { FiArrowUpRight } from "react-icons/fi";

import { cn } from "@/libs/utils";

import type { Project } from "@/data/experience";

interface ProjectCardNewProps {
  project: Project;
  className?: string;
}

function ProjectCardNew({ project, className }: ProjectCardNewProps) {
  const isExternal = project.link.startsWith("http");

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isExternal) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link"
          aria-label={`${project.title} (opens in a new tab)`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={project.link} className="group/link">
        {children}
      </Link>
    );
  };

  return (
    <li className={cn("mb-12", className)}>
      <div className="group relative grid gap-4 pb-1 transition-all duration-300 ease-out sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        {/* Hover background overlay - Desktop only */}
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-300 ease-out motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary-black/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-primary-white/5"
          aria-hidden="true"
        />

        {/* Image column */}
        {project.image && (
          <div className="z-10 sm:order-1 sm:col-span-2">
            <img
              src={project.image}
              alt={project.title}
              className="aspect-video w-full rounded border-2 border-secondary-black/10 object-cover transition-all duration-300 ease-out group-hover:border-secondary-black/30 dark:border-primary-white/10 dark:group-hover:border-primary-white/30"
            />
          </div>
        )}

        {/* Content column */}
        <div
          className={cn(
            "z-10",
            project.image ? "sm:order-2 sm:col-span-6" : "sm:col-span-8"
          )}
        >
          <h3 className="font-medium leading-snug text-secondary-black dark:text-primary-white">
            <CardWrapper>
              {/* Full card clickable area */}
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span className="inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-200 ease-out group-hover/link:text-primary-button group-focus-visible/link:text-primary-button dark:group-hover/link:text-secondary-button dark:group-focus-visible/link:text-secondary-button">
                {project.title}
                <FiArrowUpRight
                  className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </CardWrapper>
          </h3>

          <p className="mt-2 text-sm leading-normal text-secondary-black/70 dark:text-primary-white/70">
            {project.description}
          </p>

          {/* Tech pills */}
          <ul
            className="mt-2 flex flex-wrap gap-2"
            aria-label="Technologies used"
          >
            {project.technologies.map((tech) => (
              <li key={tech}>
                <div className="flex items-center rounded-full bg-primary-button/10 px-3 py-1 text-xs font-medium leading-5 text-primary-button dark:bg-secondary-button/10 dark:text-secondary-button">
                  {tech}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

ProjectCardNew.displayName = "ProjectCardNew";

export default ProjectCardNew;

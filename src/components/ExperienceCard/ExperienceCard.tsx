import { FiArrowUpRight } from "react-icons/fi";

import { cn } from "@/libs/utils";

import type { Experience } from "@/data/experience";

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

function ExperienceCard({ experience, className }: ExperienceCardProps) {
  return (
    <li className={cn("mb-12", className)}>
      <div className="group relative grid pb-1 transition-all duration-300 ease-out sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        {/* Hover background overlay - Desktop only */}
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-300 ease-out motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary-black/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-primary-white/[0.03]"
          aria-hidden="true"
        />

        {/* Date column */}
        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-secondary-black/50 dark:text-primary-white/50 sm:col-span-2">
          {experience.period}
        </header>

        {/* Content column */}
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-secondary-black dark:text-primary-white">
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-200 ease-out hover:text-primary-button focus-visible:text-primary-button dark:hover:text-secondary-button dark:focus-visible:text-secondary-button"
              aria-label={`${experience.role} at ${experience.company} (opens in a new tab)`}
            >
              {/* Full card clickable area */}
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span>
                {experience.role} ·{" "}
                <span className="inline-block">
                  {experience.company}
                  <FiArrowUpRight
                    className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </a>
          </h3>

          <p className="mt-2 text-sm leading-normal text-secondary-black/70 dark:text-primary-white/70">
            {experience.description}
          </p>

          {/* Tech pills */}
          <ul
            className="mt-2 flex flex-wrap gap-2"
            aria-label="Technologies used"
          >
            {experience.technologies.map((tech) => (
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

ExperienceCard.displayName = "ExperienceCard";

export default ExperienceCard;

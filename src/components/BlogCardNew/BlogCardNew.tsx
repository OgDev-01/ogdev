import { Link } from "@tanstack/react-router";
import { FiArrowUpRight } from "react-icons/fi";
import { format } from "date-fns";

import { cn } from "@/libs/utils";

interface BlogCardNewProps {
  id: number;
  slug: string;
  title: string;
  description?: string;
  cover_image?: string;
  created_at: string;
  reading_time_minutes: number;
  className?: string;
}

function BlogCardNew({
  id,
  slug,
  title,
  cover_image,
  created_at,
  className,
}: BlogCardNewProps) {
  const year = format(new Date(created_at), "yyyy");

  return (
    <li className={cn("mb-4", className)}>
      <div className="group relative grid gap-4 pb-1 transition-all duration-300 ease-out sm:grid-cols-8 sm:items-center lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        {/* Hover background overlay - Desktop only */}
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-300 ease-out motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary-black/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-primary-white/[0.03]"
          aria-hidden="true"
        />

        {/* Image column - hidden on mobile, shown on sm+ */}
        {cover_image && (
          <div className="z-10 hidden sm:order-1 sm:col-span-2 sm:block">
            <img
              src={cover_image}
              alt={`Cover image for ${title}`}
              className="aspect-video w-full rounded border-2 border-secondary-black/10 object-cover transition-all duration-300 ease-out group-hover:border-secondary-black/30 dark:border-primary-white/10 dark:group-hover:border-primary-white/30"
              loading="lazy"
              decoding="async"
              width={200}
              height={112}
            />
          </div>
        )}

        {/* Content column */}
        <div
          className={cn(
            "z-10",
            cover_image ? "sm:order-2 sm:col-span-6" : "sm:col-span-8"
          )}
        >
          <p className="-mt-1 text-sm font-semibold leading-6 text-secondary-black/50 dark:text-primary-white/50">
            {year}
          </p>
          <h3 className="-mt-1 font-medium leading-snug text-secondary-black dark:text-primary-white">
            <Link
              to="/blog/$slug"
              params={{ slug: `${slug}_${id}` }}
              className="group/link inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-200 ease-out hover:text-primary-button focus-visible:text-primary-button dark:hover:text-secondary-button dark:focus-visible:text-secondary-button"
            >
              {/* Full card clickable area */}
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span>
                {title}
                <FiArrowUpRight
                  className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </h3>
        </div>
      </div>
    </li>
  );
}

BlogCardNew.displayName = "BlogCardNew";

export default BlogCardNew;

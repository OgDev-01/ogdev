import Skeleton from "@/components/shared/Skeleton/Skeleton";

/**
 * Skeleton for the projects list page
 * Mimics: Header with back link, title, and projects table
 */
function ProjectsListSkeleton() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      {/* Header */}
      <header className="mb-12">
        {/* Back link */}
        <Skeleton className="h-4 w-32 mb-6" />
        {/* Title */}
        <Skeleton className="h-12 w-56 sm:h-14 sm:w-64" />
      </header>

      {/* Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="border-b border-secondary-black/10 dark:border-primary-white/10 py-4 grid grid-cols-12 gap-4">
          <Skeleton className="h-4 w-10 col-span-1" />
          <Skeleton className="h-4 w-16 col-span-3" />
          <Skeleton className="h-4 w-16 col-span-2 hidden md:block" />
          <Skeleton className="h-4 w-20 col-span-4 hidden lg:block" />
          <Skeleton className="h-4 w-10 col-span-2" />
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div
            key={i}
            className="border-b border-secondary-black/5 dark:border-primary-white/5 py-4 grid grid-cols-12 gap-4 items-start"
          >
            {/* Year */}
            <Skeleton className="h-4 w-10 col-span-2 sm:col-span-1" />

            {/* Project Name */}
            <Skeleton className="h-5 w-full col-span-6 sm:col-span-3" />

            {/* Made at - hidden on mobile */}
            <Skeleton className="h-4 w-24 col-span-2 hidden md:block" />

            {/* Built with - hidden on mobile/tablet */}
            <div className="col-span-4 hidden lg:flex gap-1.5">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-6 w-14 rounded-full" />
              ))}
            </div>

            {/* Link */}
            <Skeleton className="h-4 w-20 col-span-4 sm:col-span-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

ProjectsListSkeleton.displayName = "ProjectsListSkeleton";

export default ProjectsListSkeleton;

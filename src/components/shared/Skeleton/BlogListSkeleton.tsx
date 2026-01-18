import Skeleton from "@/components/shared/Skeleton/Skeleton";

/**
 * Skeleton for the blog list page
 * Mimics: Header with back link, title, and responsive table/cards
 */
function BlogListSkeleton() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      {/* Header */}
      <header className="mb-12">
        {/* Back link */}
        <Skeleton className="h-4 w-32 mb-6" />
        {/* Title */}
        <Skeleton className="h-12 w-48 sm:h-14 sm:w-56" />
      </header>

      {/* Mobile: Stacked Cards */}
      <div className="space-y-6 sm:hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="py-4">
            <div className="mb-2 flex items-center gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden sm:block">
        {/* Table Header */}
        <div className="border-b border-secondary-black/10 dark:border-primary-white/10 py-4 grid grid-cols-12 gap-4">
          <Skeleton className="h-4 w-12 col-span-2" />
          <Skeleton className="h-4 w-12 col-span-8" />
          <Skeleton className="h-4 w-16 col-span-2" />
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="border-b border-secondary-black/5 dark:border-primary-white/5 py-4 grid grid-cols-12 gap-4 items-start"
          >
            <Skeleton className="h-4 w-16 col-span-2" />
            <div className="col-span-8">
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <Skeleton className="h-4 w-14 col-span-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

BlogListSkeleton.displayName = "BlogListSkeleton";

export default BlogListSkeleton;

import Skeleton from "@/components/shared/Skeleton/Skeleton";

/**
 * Skeleton for the blog detail page
 * Mimics: Back link, title, meta info, cover image, content, tags, more posts
 */
function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20">
      <article>
        {/* Header */}
        <header className="mb-10">
          {/* Back link */}
          <Skeleton className="h-4 w-20 mb-8" />

          {/* Title */}
          <Skeleton className="h-10 w-full mb-2 md:h-12" />
          <Skeleton className="h-10 w-3/4 mb-6 md:h-12" />

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </header>

        {/* Cover Image */}
        <Skeleton className="mb-10 aspect-video w-full rounded-lg" />

        {/* Content */}
        <div className="space-y-4">
          {/* Paragraph 1 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Heading */}
          <Skeleton className="h-7 w-1/2 mt-8" />

          {/* Paragraph 2 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Code block */}
          <Skeleton className="h-32 w-full rounded-lg mt-4" />

          {/* Paragraph 3 */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Another heading */}
          <Skeleton className="h-7 w-2/5 mt-8" />

          {/* Paragraph 4 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-7 w-16 rounded-full" />
          ))}
        </div>
      </article>

      {/* More Posts */}
      <section className="mt-16 border-t border-secondary-black/10 pt-12 dark:border-primary-white/10">
        <Skeleton className="h-6 w-28 mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-6 py-3">
              <Skeleton className="h-4 w-16 shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-4 w-28 mt-8" />
      </section>
    </div>
  );
}

BlogDetailSkeleton.displayName = "BlogDetailSkeleton";

export default BlogDetailSkeleton;

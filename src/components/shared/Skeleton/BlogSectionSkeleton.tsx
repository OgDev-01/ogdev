import Skeleton from "@/components/shared/Skeleton/Skeleton";

/**
 * Skeleton for the blog section on the home page
 * Used as a fallback while blog posts are being fetched
 */
function BlogSectionSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="grid sm:grid-cols-8 sm:gap-4 sm:items-center">
          <div className="hidden sm:block sm:col-span-2">
            <Skeleton className="aspect-video w-full rounded-md" />
          </div>
          <div className="sm:col-span-6">
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

BlogSectionSkeleton.displayName = "BlogSectionSkeleton";

export default BlogSectionSkeleton;

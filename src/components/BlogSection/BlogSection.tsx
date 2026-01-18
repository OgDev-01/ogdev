import { useQuery } from "@tanstack/react-query";

import BlogCardNew from "@/components/BlogCardNew/BlogCardNew";
import FadeIn from "@/components/FadeIn/FadeIn";
import { BlogSectionSkeleton } from "@/components/shared/Skeleton";
import { getBlogs } from "@/server/blogs";

/**
 * Lazy-loaded blog section for the home page
 * Fetches blog data client-side using TanStack Query to avoid blocking initial page render
 */
function BlogSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", "home", 4],
    queryFn: async () => {
      const result = await getBlogs({ data: { limit: 4 } });
      return result.data ?? [];
    },
  });

  if (isLoading) {
    return <BlogSectionSkeleton />;
  }

  if (isError || !data || data.length === 0) {
    return (
      <p className="text-secondary-black/60 dark:text-primary-white/60">
        No blog posts available.
      </p>
    );
  }

  return (
    <ol className="group/list">
      {data.map((blog, index) => (
        <FadeIn key={blog.id} delay={100 + index * 50}>
          <BlogCardNew
            id={blog.id}
            slug={blog.slug}
            title={blog.title}
            description={blog.description}
            cover_image={blog.cover_image}
            created_at={blog.published_at}
            reading_time_minutes={blog.reading_time_minutes}
          />
        </FadeIn>
      ))}
    </ol>
  );
}

BlogSection.displayName = "BlogSection";

export default BlogSection;

import BlogCardNew from "@/components/BlogCardNew/BlogCardNew";
import FadeIn from "@/components/FadeIn/FadeIn";

import type { DevToBlog } from "@/server/blogs";

interface BlogSectionProps {
  blogs: DevToBlog[];
}

/**
 * Blog section for the home page
 * Receives pre-fetched blog data from the route loader for optimal SSR performance
 */
function BlogSection({ blogs }: BlogSectionProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-secondary-black/60 dark:text-primary-white/60">
        No blog posts available.
      </p>
    );
  }

  return (
    <ol className="group/list">
      {blogs.map((blog, index) => (
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

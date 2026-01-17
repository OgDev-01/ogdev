import { createFileRoute } from "@tanstack/react-router";

import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/server/blogs";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const result = await getBlogs({ data: { limit: 10 } });
    return { blogs: result.data ?? [] };
  },
  component: Blogs,
});

function Blogs() {
  const { blogs } = Route.useLoaderData();

  if (!blogs || blogs.length === 0) {
    return <div className="container text-center">No blogs found</div>;
  }

  return (
    <div className="container">
      <section className="flex flex-wrap gap-2 justify-center">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            slug={blog.slug}
            title={blog.title}
            created_at={blog.published_at}
            reading_time_minutes={blog.reading_time_minutes}
            cover_image={blog.cover_image}
            id={blog.id}
            page_views_count={blog.page_views_count}
            user={{
              name: blog.user.name,
              avatar_url: blog.user.profile_image,
            }}
          />
        ))}
      </section>
    </div>
  );
}

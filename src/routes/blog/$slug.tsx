import { createFileRoute } from "@tanstack/react-router";
import { HiOutlineBookOpen } from "react-icons/hi";
import { format } from "date-fns";

import Title from "@/components/shared/Typography/Title";
import Avatar from "@/components/Avatar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import BlogCard from "@/components/BlogCard";
import { getBlogs, getBlogById } from "@/server/blogs";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    // Extract ID from slug (format: "slug-title_id")
    const id = params.slug.split("_").pop() ?? "";

    const [blogResult, moreBlogsResult] = await Promise.all([
      getBlogById({ data: { id } }),
      getBlogs({ data: { limit: 4 } }),
    ]);

    const blog = blogResult.data;
    const moreBlogs = moreBlogsResult.data ?? [];

    // Filter out current blog from more blogs
    const filteredBlogs = moreBlogs
      .filter((b) => b.id !== Number(id))
      .slice(0, 3);

    return { blog, filteredBlogs };
  },
  component: BlogDetails,
});

function BlogDetails() {
  const { blog, filteredBlogs } = Route.useLoaderData();

  if (!blog) {
    return (
      <div className="container">
        <Title level={3}>Blog not found</Title>
      </div>
    );
  }

  return (
    <div className="container">
      <article>
        <Title className="text-2xl md:text-4xl  pb-10">{blog.title}</Title>

        <div className="w-full h-48 md:h-96 rounded-lg overflow-hidden relative">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-sm gap-4">
            <Avatar
              className="border-2 border-secondary-black dark:border-primary-white"
              size="md"
              alt="User"
              src={blog.user.profile_image}
            />
            <p className="">{blog.user.name}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <HiOutlineBookOpen className="text-xl" />
            <span>{blog.reading_time_minutes} min read</span>
          </div>
        </div>
        <div className="mt-6">
          <span className="bg-secondary-black/10 dark:bg-primary-white/10  rounded-full px-4 py-1">
            {format(new Date(blog.published_timestamp), "MMM dd yyyy")}
          </span>
        </div>

        <div className="mt-10 pb-10 border-b">
          <MarkdownRenderer content={blog.body_markdown} />
        </div>
      </article>

      <div className="mt-10 w-full">
        <Title level={4} className="text-2xl md:text-4xl  pb-10">
          Other blog posts
        </Title>
        <div className="flex gap-4 max-md:overflow-x-scroll md:justify-center">
          {filteredBlogs.length > 0 &&
            filteredBlogs.map((blog) => (
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
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { format } from "date-fns";

import Avatar from "@/components/Avatar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import FadeIn from "@/components/FadeIn/FadeIn";
import { BlogDetailSkeleton } from "@/components/shared/Skeleton";
import { getBlogs, getBlogById } from "@/server/blogs";

const SITE_URL = "https://www.ogbonna.dev";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    // Extract ID from slug (format: "slug-title_id")
    const id = params.slug.split("_").pop() ?? "";

    const [blogResult, moreBlogsResult] = await Promise.all([
      getBlogById({ data: { id } }),
      getBlogs({ data: { limit: 6 } }),
    ]);

    const blog = blogResult.data;
    const moreBlogs = moreBlogsResult.data ?? [];

    // Filter out current blog from more blogs
    const filteredBlogs = moreBlogs
      .filter((b) => b.id !== Number(id))
      .slice(0, 5);

    return { blog, filteredBlogs };
  },
  pendingComponent: BlogDetailSkeleton,
  head: ({ loaderData }) => {
    const blog = loaderData?.blog;
    const title = blog?.title
      ? `${blog.title} | Sunday Ogbonna`
      : "Blog | Sunday Ogbonna";
    const description = blog?.description || "A blog post by Sunday Ogbonna";
    // Dynamic OG image with title and description
    const image = blog
      ? `${SITE_URL}/og/png?title=${encodeURIComponent(blog.title)}&subtitle=${encodeURIComponent(blog.description || "A blog post by Sunday Ogbonna")}`
      : `${SITE_URL}/og/png?title=${encodeURIComponent("Blog")}&subtitle=${encodeURIComponent("Articles by Sunday Ogbonna")}`;
    const url = blog
      ? `${SITE_URL}/blog/${blog.slug}_${blog.id}`
      : `${SITE_URL}/blog`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        // Open Graph
        { property: "og:type", content: "article" },
        { property: "og:title", content: blog?.title || "Blog" },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:url", content: url },
        { property: "article:author", content: "Sunday Ogbonna" },
        {
          property: "article:published_time",
          content: blog?.published_timestamp,
        },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: blog?.title || "Blog" },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: blog?.title || "Blog" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogDetails,
});

function BlogDetails() {
  const { blog, filteredBlogs } = Route.useLoaderData();

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-secondary-black dark:text-primary-white">
          Post not found
        </h1>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center text-primary-button hover:underline dark:text-secondary-button"
        >
          <FiArrowLeft className="mr-2" />
          Back to all posts
        </Link>
      </div>
    );
  }

  // BlogPosting JSON-LD Schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.cover_image,
    datePublished: blog.published_timestamp,
    author: {
      "@type": "Person",
      name: "Sunday Ogbonna",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Sunday Ogbonna",
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20">
      {/* BlogPosting Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <article>
        {/* Header */}
        <header className="mb-10">
          <FadeIn delay={0} direction="down">
            <Link
              to="/blog"
              className="group mb-8 inline-flex items-center text-sm font-medium text-secondary-black/70 transition-colors hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
            >
              <FiArrowLeft
                className="mr-2 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All posts
            </Link>
          </FadeIn>

          <FadeIn delay={100} direction="up">
            <h1 className="text-3xl font-bold tracking-tight text-secondary-black dark:text-primary-white md:text-4xl lg:text-5xl">
              {blog.title}
            </h1>
          </FadeIn>

          {/* Meta info */}
          <FadeIn delay={150} direction="up">
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary-black/60 dark:text-primary-white/60">
              <div className="flex items-center gap-2">
                <Avatar
                  className="border border-secondary-black/10 dark:border-primary-white/10"
                  size="sm"
                  alt={blog.user.name}
                  src={blog.user.profile_image}
                />
                <span className="font-medium text-secondary-black/80 dark:text-primary-white/80">
                  {blog.user.name}
                </span>
              </div>
              <span className="hidden sm:inline">·</span>
              <time dateTime={blog.published_timestamp}>
                {format(new Date(blog.published_timestamp), "MMMM d, yyyy")}
              </time>
              <span>·</span>
              <div className="flex items-center gap-1">
                <HiOutlineBookOpen className="text-base" aria-hidden="true" />
                <span>{blog.reading_time_minutes} min read</span>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Cover Image */}
        {blog.cover_image && (
          <FadeIn delay={200}>
            <div className="mb-10 overflow-hidden rounded-lg">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          </FadeIn>
        )}

        {/* Content */}
        <FadeIn delay={250}>
          <MarkdownRenderer content={blog.body_markdown} />
        </FadeIn>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <FadeIn delay={300}>
            <div className="mt-12 flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-button/10 px-3 py-1 text-sm font-medium text-primary-button dark:bg-secondary-button/10 dark:text-secondary-button"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </FadeIn>
        )}
      </article>

      {/* More Posts - Table Format */}
      {filteredBlogs.length > 0 && (
        <FadeIn delay={350}>
          <section className="mt-16 border-t border-secondary-black/10 pt-12 dark:border-primary-white/10">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-secondary-black dark:text-primary-white">
              More posts
            </h2>
            <table className="w-full border-collapse text-left">
              <tbody>
                {filteredBlogs.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-secondary-black/5 transition-colors last:border-b-0 hover:bg-secondary-black/[0.03] dark:border-primary-white/5 dark:hover:bg-primary-white/[0.03]"
                  >
                    {/* Date */}
                    <td className="py-3 pr-6 align-top text-sm text-secondary-black/50 dark:text-primary-white/50">
                      {format(new Date(post.published_at), "MMM yyyy")}
                    </td>

                    {/* Title */}
                    <td className="py-3 align-top">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: `${post.slug}_${post.id}` }}
                        className="group/link inline-flex items-baseline text-sm font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
                      >
                        <span className="line-clamp-1">{post.title}</span>
                        <FiArrowUpRight
                          className="ml-1 inline-block h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8">
              <Link
                to="/blog"
                className="group inline-flex items-center text-sm font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
              >
                View all posts
                <FiArrowUpRight
                  className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </section>
        </FadeIn>
      )}
    </div>
  );
}

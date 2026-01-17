import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowLeft, FiArrowUpRight, FiClock } from "react-icons/fi";
import { format } from "date-fns";

import FadeIn from "@/components/FadeIn/FadeIn";
import { getBlogs } from "@/server/blogs";

const SITE_URL = "https://www.ogbonna.dev";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const result = await getBlogs({ data: { limit: 20 } });
    return { blogs: result.data ?? [] };
  },
  head: () => ({
    meta: [
      { title: "Blog - Sunday Ogbonna" },
      {
        name: "description",
        content:
          "Articles about web development, React, TypeScript, and software engineering by Sunday Ogbonna.",
      },
      { property: "og:title", content: "Blog - Sunday Ogbonna" },
      {
        property: "og:description",
        content:
          "Articles about web development, React, TypeScript, and software engineering by Sunday Ogbonna.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      {
        property: "og:image",
        content: `${SITE_URL}/og-image.png`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog - Sunday Ogbonna" },
      {
        name: "twitter:description",
        content:
          "Articles about web development, React, TypeScript, and software engineering by Sunday Ogbonna.",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/og-image.png`,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blogs,
});

function Blogs() {
  const { blogs } = Route.useLoaderData();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="mx-auto max-w-screen-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-secondary-black dark:text-primary-white">
          No posts found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-primary-button hover:underline dark:text-secondary-button"
        >
          <FiArrowLeft className="mr-2" />
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      {/* Header */}
      <header className="mb-12">
        <FadeIn delay={0} direction="down">
          <Link
            to="/"
            className="group mb-6 inline-flex items-center text-sm font-medium text-secondary-black/70 transition-colors hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
          >
            <FiArrowLeft
              className="mr-2 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Sunday Ogbonna
          </Link>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-black dark:text-primary-white sm:text-5xl">
            All Posts
          </h1>
        </FadeIn>
      </header>

      {/* Blog Table */}
      <FadeIn delay={200}>
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-secondary-black/10 bg-primary-white/75 px-6 py-5 backdrop-blur-sm dark:border-primary-white/10 dark:bg-secondary-black/75">
            <tr>
              <th className="py-4 pl-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white">
                Date
              </th>
              <th className="py-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white">
                Title
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-secondary-black dark:text-primary-white sm:table-cell">
                Read Time
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-b border-secondary-black/5 transition-colors hover:bg-secondary-black/5 dark:border-primary-white/5 dark:hover:bg-primary-white/5"
              >
                {/* Date */}
                <td className="py-4 pl-4 pr-8 align-top text-sm text-secondary-black/60 dark:text-primary-white/60">
                  {format(new Date(blog.published_at), "MMM yyyy")}
                </td>

                {/* Title */}
                <td className="py-4 pr-8 align-top">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: `${blog.slug}_${blog.id}` }}
                    className="group/link inline-flex items-baseline font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
                  >
                    <span className="line-clamp-2">{blog.title}</span>
                    <FiArrowUpRight
                      className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </td>

                {/* Reading Time */}
                <td className="hidden py-4 pr-8 align-top text-sm text-secondary-black/60 dark:text-primary-white/60 sm:table-cell">
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
                    {blog.reading_time_minutes} min
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeIn>
    </div>
  );
}

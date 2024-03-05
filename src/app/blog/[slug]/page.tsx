import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HiOutlineBookOpen } from "react-icons/hi";
import { format } from "date-fns";

import Title from "@/components/shared/Typography/Title";
import Avatar from "@/components/Avatar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import BlogCard from "@/components/BlogCard";
import { fetchApiData } from "@/libs/helpers/fetcher";
import { getBlogById } from "@/backend/model/blogs";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const id = params.slug.split("_").pop() ?? "";
  const blog = await getBlogById(id);
  if (!blog) {
    return {
      title: "Page not found",
      description: "The page you are looking for does not exist",
    };
  }
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: blog.cover_image,
      title: blog.title,
      description: blog.description,
      url: blog.canonical_url,
      type: "article",
      publishedTime: blog.published_timestamp,
      authors: [blog.user.name],
      siteName: "Ogbonna Sunday",
    },
    twitter: {
      card: "summary_large_image",
      creator: blog.user.twitter_username,
      title: `${blog.title} | Ogbonna Sunday`,
      description: blog.description,
      images: {
        url: blog.cover_image,
        alt: `Cover image for ${blog.title}`,
      },
    },
    keywords: [
      blog.tag_list.join(", "),
      blog.title,
      blog.description,
      blog.slug,
      blog.user.name,
    ],
    alternates: {
      canonical: blog.canonical_url,
    },
    authors: [
      {
        name: blog.user.name,
        url: blog.user.website_url,
      },
    ],
    publisher: "Ogbonna Sunday",
  };
}

export async function generateStaticParams() {
  const blogs = await fetchBlogs();

  if (!blogs) {
    return [];
  }

  return blogs.map((blog) => ({
    params: { slug: `${blog.slug}_${blog.id}` },
  }));
}

const getSingleBlog = async (id: string) => {
  try {
    const data = getBlogById(id);
    return data;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};

const fetchBlogs = async () => {
  try {
    const { data } = await fetchApiData<DEVBlogs[]>("/blogs?limit=3", {
      cache: "no-cache",
    });
    return data;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};

interface BlogDetailsProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] };
}
const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const slug = params.slug;
  const id = slug.split("_").pop() ?? "";

  const blog = await getSingleBlog(id);

  const moreBlogs = await fetchBlogs();

  const filteredBlogs = moreBlogs
    ? moreBlogs.filter((blog) => blog.id !== +id).slice(0, 3)
    : [];

  if (!blog) notFound();

  return (
    <div className="container">
      <article>
        <Title className="text-2xl md:text-4xl  pb-10">{blog.title}</Title>

        <div className="w-full h-48 md:h-96 rounded-lg overflow-hidden relative">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
            fill
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
          {filteredBlogs.length &&
            filteredBlogs.map((blog, idx) => (
              <BlogCard
                key={idx}
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
};

export default BlogDetails;

export const dynamic = "force-dynamic";

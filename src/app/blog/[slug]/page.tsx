import Image from "next/image";
import { HiOutlineBookOpen } from "react-icons/hi";
import { format } from "date-fns";

import Title from "@/components/shared/Typography/Title";
import Avatar from "@/components/Avatar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import BlogCard from "@/components/BlogCard";
import { fetchApiData } from "@/libs/helpers/fetcher";

const getSingleBlog = async (id: string) => {
  try {
    const { data } = await fetchApiData<DEVBlogs>(`/blogs/${id}`, {
      cache: "no-cache",
    });
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

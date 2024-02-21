import Image from "next/image";
import { HiOutlineBookOpen } from "react-icons/hi";
import { format } from "date-fns";

import Title from "@/components/shared/Typography/Title";
import Avatar from "@/components/Avatar";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const getSingleBlog = async (id: string) => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  const res = await fetch(`${host}/api/blogs/${id}`, { cache: "no-cache" });
  const data = (await res.json()) as DEVBlogs;
  return data;
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

  return (
    <div className="container">
      <article>
        <Title className="text-2xl md:text-4xl  pb-10"> {blog.title}</Title>

        <div className="w-full h-44 md:h-96 rounded-lg overflow-hidden relative">
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

        <div className="mt-10 pb-10 border-b-2">
          <MarkdownRenderer content={blog.body_markdown} />
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;

import { revalidateTag } from "next/cache";
import BlogCard from "@/components/BlogCard";
import Title from "@/components/shared/Typography/Title";

const fetchBlogs = async () => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  const res = await fetch(`${host}/api/blogs`);

  if (res.ok) {
    const data = (await res.json()) as DEVBlogs[];
    revalidateTag("");
    return data;
  }
  throw new Error("Failed to fetch blogs data");
};

const Blogs = async () => {
  const blogs = await fetchBlogs();

  return (
    <div className="container">
      <Title className="text-3xl md:text-5xl text-center pb-10">Blogs</Title>
      <article className="flex flex-wrap gap-2 justify-center">
        {blogs.map((blog, idx) => (
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
      </article>
    </div>
  );
};

export default Blogs;

export const revalidate = 3600;

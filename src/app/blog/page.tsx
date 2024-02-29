import BlogCard from "@/components/BlogCard";
import { fetchApiData } from "@/libs/helpers/fetcher";

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

const Blogs = async () => {
  const blogs = await fetchBlogs();

  if (!blogs) {
    return <div className="container text-center">No blogs found</div>;
  }

  return (
    <div className="container">
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

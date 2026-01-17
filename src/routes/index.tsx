import { createFileRoute, Link } from "@tanstack/react-router";
import { VscArrowRight } from "react-icons/vsc";
import { BsArrowUpRightCircle } from "react-icons/bs";

import HeroSection from "@/components/HeroSection/HeroSection";
import Title from "@/components/shared/Typography/Title";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { truncateString } from "@/libs/utils";
import { getAllProjects } from "@/data/projects";
import { getBlogs } from "@/server/blogs";

export const Route = createFileRoute("/")({
  loader: async () => {
    const projects = getAllProjects().slice(0, 3);
    const blogsResult = await getBlogs({ data: { limit: 3 } });
    return {
      projects,
      blogs: blogsResult.data ?? [],
    };
  },
  component: Home,
});

function Home() {
  const { projects, blogs } = Route.useLoaderData();

  return (
    <div className="w-full">
      <HeroSection />
      <section className="container mt-20">
        <div className="flex justify-between items-center">
          <Title level={3}>Projects</Title>
          <Link className="flex items-center gap-2" to="/projects">
            View more <VscArrowRight className="text-2xl" />
          </Link>
        </div>
        <div className="flex flex-col mt-8 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={
                project.title.length > 50
                  ? truncateString(project.title, 50)
                  : project.title
              }
              tags={project.tags}
              slug={project.slug}
              cover_image={project.cover_image}
              content={project.content}
              project_link={project.project_link}
              start_date={project.start_date}
              end_date={project.end_date}
            />
          ))}
        </div>
      </section>
      <section className="container mt-20 overflow-hidden">
        <div className="flex justify-between items-center">
          <Title level={3}>Blog post</Title>
          <Link className="flex items-center gap-2" to="/blog">
            View all posts <VscArrowRight className="text-2xl" />
          </Link>
        </div>

        <section className="flex gap-4 max-md:overflow-x-scroll md:justify-center mt-10 pr-5 md:pr-0">
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
      </section>

      <div className="container mt-20">
        <Title className="text-5xl md:text-8xl font-extrabold" level={4}>
          Let's work <br /> together !!
        </Title>
        <a
          href="mailto:sunday@ogbonna.dev"
          className="text-2xl md:text-5xl flex text-primary-button font-semibold mt-10 items-center gap-6"
        >
          Sunday@ogbonna.dev <BsArrowUpRightCircle />
        </a>
      </div>
    </div>
  );
}

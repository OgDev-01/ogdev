import { VscArrowRight } from "react-icons/vsc";
import { BsArrowUpRightCircle } from "react-icons/bs";

import Link from "next/link";

import HeroSection from "@/components/HeroSection/HeroSection";
import Title from "@/components/shared/Typography/Title";
import ProjectCard from "@/components/ProjectCard";
import { truncateString } from "@/libs/utils";
import BlogCard from "@/components/BlogCard";
import { getAllProjects } from "@/backend/model/projects";
import { getAllBlogs } from "@/backend/model/blogs";

const getProjects = async () => {
  try {
    const projects = await getAllProjects("3");
    return projects;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};
const fetchBlogs = async () => {
  try {
    const res = getAllBlogs({ limit: "3" });

    return res;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};

export default async function Home() {
  const projects = await getProjects();
  const blogs = await fetchBlogs();

  return (
    <main className="w-full">
      <HeroSection />
      <section className="container mt-20">
        {projects && projects.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <Title level={3}>Projects</Title>
              <Link className="flex items-center gap-2" href="/projects">
                View more <VscArrowRight className="text-2xl" />
              </Link>
            </div>
            <div className="flex flex-col mt-8 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  id={project.id}
                  title={
                    project.title.length > 50
                      ? truncateString(project.title, 50)
                      : project.title
                  }
                  tags={project.tags ?? ""}
                  slug={project.slug}
                  cover_image={project.cover_image}
                  content={project.content}
                  project_link={project.project_link}
                  start_date={project.start_date}
                  end_date={project.end_date}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <section className="container mt-20 overflow-hidden">
        <div className="flex justify-between items-center">
          <Title level={3}>Blog post</Title>
          <Link className="flex items-center gap-2" href="/blog">
            View all posts <VscArrowRight className="text-2xl" />
          </Link>
        </div>

        <article className="flex gap-4 max-md:overflow-x-scroll md:justify-center mt-10 pr-5 md:pr-0">
          {blogs?.map((blog, idx) => (
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
      </section>

      <div className="container mt-20">
        <Title className="text-5xl md:text-8xl font-extrabold" level={4}>
          Let’s work <br /> together !!
        </Title>
        <a
          rel="noreferral"
          href="mailto:hello@ogbonna.dev"
          className="text-2xl md:text-5xl flex text-primary-button font-semibold mt-10 items-center gap-6"
        >
          Hello@ogbonna.dev <BsArrowUpRightCircle />
        </a>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";

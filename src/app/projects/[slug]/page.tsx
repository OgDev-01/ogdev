import Image from "next/image";
import { HiOutlineCalendar } from "react-icons/hi";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { format } from "date-fns";
import Title from "@/components/shared/Typography/Title";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ProjectCard from "@/components/ProjectCard";
import Text from "@/components/shared/Typography/Text";
import { getAllProjects, getProjectBySlug } from "@/backend/model/projects";

const getSingleProjectBySlug = async (slug: string) => {
  try {
    const product = await getProjectBySlug(slug);

    return product;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};

const getOtherProjects = async () => {
  try {
    const projects = await getAllProjects("3");

    return projects;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};

interface ProjectProps {
  params: { slug: string };
}
const page = async ({ params }: ProjectProps) => {
  const { slug } = params;

  const project = await getSingleProjectBySlug(slug);

  const otherProjects = await getOtherProjects();

  const filteredProjects = otherProjects
    ? otherProjects.filter((project) => project.slug !== slug).slice(0, 1)
    : [];

  if (!project) {
    return null;
  }

  const tags = project.tags ? project.tags.split(",") : [];

  const getTotalWeeks = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.floor(diffInDays / 7);
  };

  return (
    <div className="container">
      <article>
        <Title className="text-2xl md:text-4xl  pb-10">{project.title}</Title>

        {project.subtitle && (
          <Text className="text-xl md:text-2xl mb-12 ">{project.subtitle}</Text>
        )}
        <div className="w-full h-48 md:h-96 rounded-lg overflow-hidden relative">
          <Image
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mt-6 flex gap-3 md:w-3/6 flex-wrap order-1 md:order-0">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-secondary-black/10 dark:bg-primary-white/10  rounded-full px-4 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="self-start order-0 md:order-1">
            <div className="flex items-center gap-2 text-sm mt-6">
              <HiOutlineCalendar className="text-xl" />
              <span>
                {format(new Date(project.start_date), "MMM, yyyy")} -{" "}
                {format(new Date(project.end_date), "MMM, yyyy")}
              </span>
              {getTotalWeeks(
                String(project.start_date),
                String(project.end_date)
              ) > 1 && (
                <span>
                  {" "}
                  (
                  {getTotalWeeks(
                    String(project.start_date),
                    String(project.end_date)
                  )}{" "}
                  weeks)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 pb-10 ">
          <MarkdownRenderer content={project.content} />
        </div>

        <a
          className="flex items-center gap-4 text-4xl text-primary-button font-bold mt-10"
          target="_blank"
          rel="noreferrer"
          href={project.project_link}
        >
          Visit Site <BsArrowUpRightCircle />
        </a>
      </article>

      {filteredProjects.length > 0 && (
        <div className="mt-20 w-full">
          <Title level={4} className="text-2xl md:text-3xl  pb-10">
            Other Projects
          </Title>
          <div className="w-full">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                slug={project.slug}
                title={project.title}
                cover_image={project.cover_image}
                id={project.id}
                tags={`${project.tags}`}
                project_link={project.project_link}
                start_date={project.start_date}
                end_date={project.end_date}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

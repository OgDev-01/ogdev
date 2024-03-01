import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/backend/model/projects";

interface ProjectsProps {
  searchParams: { limit?: string };
}
const Projects = async ({ searchParams }: ProjectsProps) => {
  const getprojects = async () => {
    try {
      return await getAllProjects(searchParams.limit ?? "10");
    } catch (e) {
      //eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const projects = await getprojects();

  return (
    <div className="container flex flex-col gap-6">
      {projects?.map(
        (
          {
            title,
            subtitle,
            slug,
            content,
            cover_image,
            start_date,
            end_date,
            project_link,
            id,
            tags,
          },
          idx
        ) => (
          <ProjectCard
            key={idx}
            title={title}
            subtitle={`${subtitle}`}
            slug={slug}
            content={content}
            cover_image={cover_image}
            start_date={start_date}
            end_date={end_date}
            project_link={project_link}
            id={id}
            tags={`${tags}`}
          />
        )
      )}
    </div>
  );
};

export default Projects;

export const dynamic = "force-dynamic";

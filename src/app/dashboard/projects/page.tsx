import { getAllProjects } from "@/backend/model/projects";
import ProjectCard from "@/components/ProjectCard";

const getProjects = async () => {
  try {
    return await getAllProjects("10");
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};
const Projects = async () => {
  const projects = await getProjects();

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
            subtitle={subtitle ?? ""}
            slug={slug}
            content={content}
            cover_image={cover_image}
            start_date={start_date}
            end_date={end_date}
            project_link={project_link}
            id={id}
            tags={tags ?? ""}
            isEditable
          />
        )
      )}
    </div>
  );
};

export default Projects;

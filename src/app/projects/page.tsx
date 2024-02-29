import ProjectCard from "@/components/ProjectCard";
import { fetchApiData } from "@/libs/helpers/fetcher";

const getAllProjects = async () => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  try {
    const res = await fetchApiData<DbProject[]>(`/projects`, {
      cache: "no-cache",
    });
    return res.data;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log(error);
  }
};
const Projects = async () => {
  const projects = await getAllProjects();

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
            subtitle={subtitle}
            slug={slug}
            content={content}
            cover_image={cover_image}
            start_date={start_date}
            end_date={end_date}
            project_link={project_link}
            id={id}
            tags={tags}
          />
        )
      )}
    </div>
  );
};

export default Projects;

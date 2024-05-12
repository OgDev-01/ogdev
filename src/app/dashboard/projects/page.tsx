import ProjectCard from "@/components/ProjectCard";

const getAllProjects = async () => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  try {
    const res = await fetch(`${host}/api/projects`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data.data as DbProject[];
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
            isEditable
          />
        )
      )}
    </div>
  );
};

export default Projects;

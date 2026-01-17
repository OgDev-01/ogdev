import { createFileRoute } from "@tanstack/react-router";

import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  loader: () => {
    const projects = getAllProjects();
    return { projects };
  },
  component: Projects,
});

function Projects() {
  const { projects } = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          subtitle={project.subtitle}
          slug={project.slug}
          content={project.content}
          cover_image={project.cover_image}
          start_date={project.start_date}
          end_date={project.end_date}
          project_link={project.project_link}
          id={project.id}
          tags={project.tags}
        />
      ))}
    </div>
  );
}

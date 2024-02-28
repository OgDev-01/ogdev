import Link from "next/link";
import { VscArrowRight } from "react-icons/vsc";
import ProjectCard from "@/components/ProjectCard";
import Title from "@/components/shared/Typography/Title";

const getProjects = async () => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  try {
    const res = await fetch(`${host}/api/projects?limit=3`, {
      cache: "no-cache",
      next: { tags: ["projects"] },
    });
    const data = await res.json();
    return data.data as DbProject[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const Dashboard = async () => {
  const projects = await getProjects();

  return (
    <div className="container pt-20">
      <div className="flex justify-between items-center">
        <Title level={3}>Projects</Title>
        <Link className="flex items-center gap-2" href="/dashboard/projects">
          View all <VscArrowRight className="text-2xl" />
        </Link>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              isEditable
              id={project.id}
              title={project.title}
              slug={project.slug}
              subtitle={project.subtitle}
              cover_image={project.cover_image}
              project_link={project.project_link}
              tags={project.tags}
              start_date={project.start_date}
              end_date={project.end_date}
            />
          ))
        ) : (
          <div className="text-center">No projects found</div>
        )}

        <div className="flex justify-center">
          <Link
            href="/dashboard/projects/new"
            className="bg-primary-button text-white px-6 py-3 rounded-full"
          >
            Create New Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

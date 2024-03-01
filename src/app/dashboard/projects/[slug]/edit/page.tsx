import Form from "@/app/dashboard/Form";
import { getProjectBySlug } from "@/backend/model/projects";

const getSingleProject = async (slug: string) => {
  try {
    const project = await getProjectBySlug(slug);
    return project;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: PageProps) => {
  const project = await getSingleProject(params.slug);

  if (!project) {
    return <div className="container">Project not found</div>;
  }

  const {
    start_date,
    end_date,
    title,
    slug,
    subtitle,
    tags,
    project_link,
    content,
    cover_image,
  } = project;

  return (
    <div className="container">
      <Form
        defaultValues={{
          title,
          subtitle: subtitle ?? "",
          content,
          start_date: String(start_date),
          end_date: String(end_date),
          cover_image,
          tags: tags ?? "",
          project_link,
          slug,
        }}
      />
    </div>
  );
};

export default page;

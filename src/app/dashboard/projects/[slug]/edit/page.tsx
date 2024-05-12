import Form from "@/app/dashboard/Form";

const getSingleProject = async (slug: string) => {
  const host = process.env.NEXT_PUBLIC_URL_HOST;
  try {
    const res = await fetch(`${host}/api/projects/${slug}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data.data as DbProject;
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
          subtitle,
          content,
          start_date,
          end_date,
          cover_image,
          tags,
          project_link,
          slug,
        }}
      />
    </div>
  );
};

export default page;

import { auth } from "@clerk/nextjs";
import { ForwardRefEditor } from "@/components/MdxEditor/ForwardRefEditor";

const Dashboard = async () => {
  const { getToken } = auth();

  const token = await getToken();

  //eslint-disable-next-line
  console.log(token);

  return (
    <div className="container">
      <form action="">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <input type="file" name="cover_image" />
        <ForwardRefEditor
          contentEditableClassName="prose"
          markdown={"# Hello world Whatsup"}
          className="w-full border-none focus:ring-0 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default Dashboard;

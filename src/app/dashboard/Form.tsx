"use client";
import { ForwardRefEditor } from "@/components/MdxEditor/ForwardRefEditor";

const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
  };
  return (
    <form>
      <div>
        <input className="" type="text" name="title" />
        <input className="" type="text" name="description" />
        <input className="" type="file" name="cover_image" />
      </div>
      <button className="bg-secondary-black dark:bg-white dark:text-secondary-black text-white px-3 py-1.5 rounded-xl ">
        Submit
      </button>
      <ForwardRefEditor
        contentEditableClassName="prose dark:prose-invert min-w-full focus:outline-none focus:border-none p-6 bg-slate-50 min-h-[calc(100vh-76px)]"
        markdown={``}
        onError={(error) => alert(error)}
        className="p-2 focus:border-none focus:outline-none min-h-[300px]"
      />
    </form>
  );
};

export default Form;

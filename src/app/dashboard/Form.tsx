"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PiTextTBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { ForwardRefEditor } from "@/components/MdxEditor/ForwardRefEditor";

import "react-toastify/dist/ReactToastify.css";
import SeperatorInput from "@/components/shared/Input/SeperatorInput";
import { cn } from "@/libs/utils";
import DatePicker from "@/components/DatePicker";
import ClientOnly from "@/components/shared/ClientOnly/ClientOnly";
import Button from "@/components/shared/Button/Button";

const fileTypes = ["JPG", "PNG", "GIF"];

interface FormProps {
  defaultValues?: {
    title: string;
    subtitle: string;
    cover_image: string;
    project_link: string;
    start_date: string;
    end_date: string;
    tags: string;
    content: string;
    slug: string;
  };
}
const Form = ({ defaultValues }: FormProps) => {
  const {
    title,
    subtitle,
    cover_image,
    project_link,
    start_date,
    end_date,
    tags: defaultTags,
    content,
    slug,
  } = defaultValues || {
    title: "",
    subtitle: "",
    cover_image: "",
    project_link: "",
    start_date: "",
    end_date: "",
    tags: "",
    content: "",
    slug: "",
  };

  const router = useRouter();

  const [markdown, setMarkdown] = useState(`${content}`);
  const formRef = useRef<HTMLFormElement>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(
    start_date ? new Date(start_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    end_date ? new Date(end_date) : undefined
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(
    cover_image || null
  );
  const [tags, setTags] = useState<string[]>(
    defaultTags ? defaultTags.split(",") : []
  );
  const handleChange = (file: File) => {
    const image = URL.createObjectURL(file);
    setPreviewImg(image);
    setFile(file);
  };
  const [showDescription, setShowDescription] = useState(
    subtitle ? true : false
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.title) {
      return toast.error("Please add a title");
    }
    if (!file && !previewImg) {
      return toast.error("Please upload a cover image");
    }

    if (!markdown) {
      return toast.error("Please write something");
    }

    const formData = new FormData(event.currentTarget);

    formData.append("content", markdown);

    if (startDate) {
      formData.append("start_date", startDate.toISOString());
    }

    if (endDate) {
      formData.append("end_date", endDate.toISOString());
    }

    formData.delete("tags");

    formData.append("tags", tags.join(","));

    try {
      // If defaultValues is passed, then it's an update
      if (defaultValues) {
        const res = await fetch(`/api/projects/${slug}`, {
          method: "PATCH",
          body: formData,
        });

        toast.success("Project updated");

        router.push("/dashboard");

        return;
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      toast.success("Project created");

      formRef.current?.reset();
      setPreviewImg(null);
      setFile(null);
      setTags([]);
      setMarkdown("");
      setStartDate(undefined);
      setEndDate(undefined);
      setShowDescription(false);

      router.push("/dashboard/projects");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: "DELETE",
      });

      toast.success("Project deleted");

      router.push("/dashboard/projects");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ClientOnly>
      <div className="flex justify-end">
        <Button
          onClick={handleDelete}
          isPrimary
          className="bg-red-500 border-none hover:bg-red-500/90 hover:text-white"
        >
          Delete Project
        </Button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="">
        <div className="px-1 flex flex-col gap-4 md:gap-6 mb-4">
          <input
            className="text-4xl h-14 focus:outline-none"
            placeholder="Add Title..."
            type="text"
            name="title"
            defaultValue={title}
          />

          <div
            className={cn(
              "flex flex-col gap-4 md:gap-6",
              previewImg || showDescription ? "flex-col" : "md:flex-row"
            )}
          >
            {showDescription ? (
              <input
                className="text-xl h-10 focus:outline-none"
                type="text"
                name="subtitle"
                placeholder="Add Subtitle..."
              />
            ) : (
              <button
                className="w-max px-4 py-2 flex items-center gap-2 bg-secondary-black text-white rounded-lg h-max"
                onClick={() => setShowDescription(true)}
              >
                <PiTextTBold className="text-xl" /> Add Subtitle
              </button>
            )}
            <div className="flex gap-6 md:gap-16 items-center flex-col md:flex-row">
              {/* This is a preview box */}
              {previewImg && (
                <div className="max-w-96">
                  <picture>
                    <img
                      className="rounded-lg"
                      // keep the image aspect ratio
                      style={{ objectFit: "cover" }}
                      src={previewImg}
                      alt="preview"
                    />
                  </picture>
                </div>
              )}

              <div className="flex gap-6 max-md:self-start">
                <FileUploader
                  handleChange={handleChange}
                  name="cover_image"
                  types={fileTypes}
                  value={file}
                  label="Drag & Drop or Click to Upload"
                  classes="bg-secondary-black text-white h-auto w-max rounded-lg flex flex-col items-center justify-center h-max"
                >
                  <button className="px-4 py-2 flex items-center gap-2">
                    <IoImageOutline className="text-xl" />
                    {previewImg ? "Change" : "Add cover image"}
                  </button>
                </FileUploader>

                {previewImg && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImg(null);
                      setFile(null);
                    }}
                    className=" text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <SeperatorInput
            placeholder="Enter technologies used (e.g. React, TailwindCSS)"
            label="Add Tags:"
            name="tags"
            tags={tags}
            onTagsChange={setTags}
          />
          <fieldset className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="project_link">
              Project Link:
            </label>
            <input
              className="border-2 border-black/30 h-14 focus:outline-none rounded-lg px-5 text-light-slate-9 text-sm"
              type="text"
              name="project_link"
              id="project_link"
              defaultValue={project_link}
              placeholder="Add project preview/live link"
            />
          </fieldset>

          <div className="flex items-center gap-6">
            <DatePicker
              onChange={(day) => setStartDate(day)}
              value={startDate}
              placeholder="Start date"
            />

            <DatePicker
              onChange={(day) => setEndDate(day)}
              value={endDate}
              placeholder="End date"
            />
          </div>
        </div>

        <ForwardRefEditor
          contentEditableClassName="prose dark:prose-invert min-w-full focus:outline-none focus:border-none p-6 bg-slate-50 min-h-[calc(100vh-76px)] "
          markdown={markdown}
          onChange={(value) => setMarkdown(value)}
          onError={(error) => alert(error)}
          className="p-2 focus:border-none focus:outline-none min-h-[300px]"
        />

        <ToastContainer />
      </form>
    </ClientOnly>
  );
};

export default Form;

"use client";
import { useState } from "react";
import { PiTextTBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { ForwardRefEditor } from "@/components/MdxEditor/ForwardRefEditor";

import "react-toastify/dist/ReactToastify.css";
import SeperatorInput from "@/components/shared/Input/SeperatorInput";
import { cn } from "@/libs/utils";

const fileTypes = ["JPG", "PNG", "GIF"];
const Form = () => {
  const [markdown, setMarkdown] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const handleChange = (file: File) => {
    const image = URL.createObjectURL(file);
    setPreviewImg(image);
    setFile(file);
  };
  const [showDescription, setShowDescription] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.title) {
      return toast.error("Please add a title");
    }
    if (!file) {
      return toast.error("Please upload a cover image");
    }

    if (!markdown) {
      return toast.error("Please write something");
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="px-1 flex flex-col gap-4 md:gap-6 mb-4">
        <input
          className="text-4xl h-14 focus:outline-none"
          placeholder="Add Title..."
          type="text"
          name="title"
        />

        <div
          className={cn(
            "flex flex-col md:flex-row gap-4 md:gap-6",
            previewImg || showDescription ? "flex-col" : ""
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
            placeholder="Add project preview/live link"
          />
        </fieldset>
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
  );
};

export default Form;

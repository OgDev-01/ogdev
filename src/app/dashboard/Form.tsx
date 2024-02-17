"use client";
import { useState } from "react";
import { PiTextTBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { ForwardRefEditor } from "@/components/MdxEditor/ForwardRefEditor";

import "react-toastify/dist/ReactToastify.css";

const fileTypes = ["JPG", "PNG", "GIF"];
const Form = () => {
  const [markdown, setMarkdown] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
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
      <div className="px-1 flex flex-col gap-6 mb-4">
        <input
          className="text-4xl h-14 focus:outline-none"
          placeholder="Add Title..."
          type="text"
          name="title"
        />

        {showDescription ? (
          <input
            className="text-xl h-10 focus:outline-none"
            type="text"
            name="description"
          />
        ) : (
          <button
            className="w-max px-4 py-1.5 flex items-center gap-2 bg-secondary-black text-white rounded-lg"
            onClick={() => setShowDescription(true)}
          >
            <PiTextTBold className="text-xl" /> Add Subtitle
          </button>
        )}

        <FileUploader
          handleChange={handleChange}
          name="cover_image"
          types={fileTypes}
          value={file}
          label="Drag & Drop or Click to Upload"
          classes="border border-dashed !border-secondary-black/50 h-auto rounded-lg flex flex-col items-center justify-center"
        >
          {previewImg ? (
            <img src={previewImg} alt="preview" className="object-contain" />
          ) : (
            <div className="flex flex-col opacity-40 items-center py-20">
              <IoImageOutline className="text-6xl md:text-8xl" />
              <p className="text-lg md:text-xl text-center">
                Drag & Drop or Click to Upload
              </p>
            </div>
          )}

          {previewImg && (
            <button
              onClick={() => {
                setPreviewImg(null);
                setFile(null);
              }}
              className="px-2 py-1.5 mx-auto w-max rounded-md"
            >
              clear image
            </button>
          )}
        </FileUploader>
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

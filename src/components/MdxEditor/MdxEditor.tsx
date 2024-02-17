"use client";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  imagePlugin,
  frontmatterPlugin,
  linkPlugin,
  diffSourcePlugin,
  codeBlockPlugin,
  SandpackConfig,
  sandpackPlugin,
  codeMirrorPlugin,
  linkDialogPlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import { UploadImageInServer } from "./image-upload-server-wrapper";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const defaultSnippetContent = `
  export default function App() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
  `.trim();

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react",
    presets: [
      {
        label: "React",
        name: "react",
        meta: "live react",
        sandpackTemplate: "react",
        sandpackTheme: "light",
        snippetFileName: "/App.js",
        snippetLanguage: "jsx",
        initialSnippetContent: defaultSnippetContent,
      },
    ],
  };

  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        frontmatterPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            typescript: "TypeScript",
            html: "HTML",
            json: "JSON",
            jsx: "JSX",
            tsx: "TSX",
            shell: "Shell",
            bash: "Bash",
          },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <KitchenSinkToolbar />
              <button className="bg-secondary-black dark:bg-white dark:text-secondary-black text-white px-4 py-1.5 rounded-xl ">
                Publish
              </button>
            </>
          ),
        }),
        diffSourcePlugin({
          diffMarkdown: "",
          viewMode: "rich-text",
        }),
        imagePlugin({
          imageUploadHandler: async (image) => {
            return await UploadImageInServer(image);
          },
          disableImageResize: false,
          imagePreviewHandler: async (imageSource) => {
            return imageSource;
          },
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}

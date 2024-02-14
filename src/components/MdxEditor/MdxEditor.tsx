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
  KitchenSinkToolbar,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        frontmatterPlugin(),
        toolbarPlugin({
          toolbarContents: () => <KitchenSinkToolbar />,
        }),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve("https://picsum.photos/200/300");
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
          ],
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}

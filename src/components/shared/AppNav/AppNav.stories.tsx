import type { Meta } from "@storybook/react";
import AppNav from "./AppNav";

type StoryMeta = Meta<typeof AppNav>;

const meta: StoryMeta = {
  title: "Design System/AppNav",
  component: AppNav,
};

export default meta;

export const Default = () => <AppNav />;

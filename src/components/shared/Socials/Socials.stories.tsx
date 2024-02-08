import { Meta } from "@storybook/react";
import Socials from "./Socials";

type StoryMeta = Meta<typeof Socials>;

const meta: StoryMeta = {
  title: "Design System/Socials",
  component: Socials,
};

export default meta;

export const Default = () => <Socials />;

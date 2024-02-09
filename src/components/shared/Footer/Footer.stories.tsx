import { Meta } from "@storybook/react";
import Footer from "./Footer";

type StoryMeta = Meta<typeof Footer>;

const meta: StoryMeta = {
  title: "Design System/Footer",
  component: Footer,
};

export default meta;

export const Default = () => <Footer />;

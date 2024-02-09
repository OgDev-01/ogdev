import { Meta } from "@storybook/react";

import NewsletterForm from "./NewsletterForm";

type StoryMeta = Meta<typeof NewsletterForm>;

const meta: StoryMeta = {
  title: "Design System/NewsletterForm",
  component: NewsletterForm,
};

export default meta;

export const Default = () => <NewsletterForm />;

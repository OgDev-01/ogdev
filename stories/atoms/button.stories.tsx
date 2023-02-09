import { Button } from "@/components/atoms/Button/Button";

import { Meta, StoryObj } from "@storybook/react";

const StoryConfig: Meta<typeof Button> = {
    title: "Design System/Atoms/Button",
    component: Button
};
export default StoryConfig;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
    args: { variant: "filled", children: "Filled" }
};
export const Outlined: Story = {
    args: { variant: "outlined", children: "Outlined" }
};
export const Disabled: Story = {
    args: { disabled: true, children: "Disabled" }
};

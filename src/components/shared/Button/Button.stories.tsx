import Button from "./Button";
import { Meta, StoryObj } from "@storybook/react";

type StoryMeta = Meta<typeof Button>;

const meta: StoryMeta = {
  title: "Design System/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SecondaryFilled: Story = {
  args: { variant: "filled", children: "Filled" },
};
export const SecondaryOutlined: Story = {
  args: { variant: "outlined", children: "Outlined" },
};
export const SecondaryDisabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const Primary: Story = {
  args: { isPrimary: true, children: "Primary" },
};

export const PrimaryOutlined: Story = {
  args: { isPrimary: true, variant: "outlined", children: "PrimaryOutlined" },
};

export const PrimaryDisabled: Story = {
  args: { isPrimary: true, disabled: true, children: "PrimaryDisabled" },
};

export const PrimaryOutlinedDisabled: Story = {
  args: {
    isPrimary: true,
    variant: "outlined",
    disabled: true,
    children: "PrimaryOutlinedDisabled",
  },
};

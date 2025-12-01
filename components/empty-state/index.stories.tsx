import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EmptyState from ".";

const meta: Meta<typeof EmptyState> = {
  title: "Design System/Feedback/Empty State",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "title goes here maximum 2 lines but please make it short",
    description: "Empty state description goes here.",
    primaryButtonLabel: "Button Label",
    secondaryButtonLabel: "Button Label",
    layout: "default",
  },
  argTypes: {
    layout: {
      control: "radio",
      options: ["default", "horizontal", "card"],
    },
    onPrimaryClick: { action: "primary clicked" },
    onSecondaryClick: { action: "secondary clicked" },
    onClose: { action: "close clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneDefault: Story = {
  args: { layout: "default" },
};

export const PhoneHorizontal: Story = {
  args: { layout: "horizontal" },
};

export const PhoneCard: Story = {
  args: { layout: "card" },
};

export const TabletDefault: Story = {
  args: { layout: "default" },
};

export const TabletHorizontal: Story = {
  args: { layout: "horizontal" },
};

export const TabletCard: Story = {
  args: { layout: "card" },
};

export const DesktopDefault: Story = {
  args: { layout: "default" },
};

export const DesktopHorizontal: Story = {
  args: { layout: "horizontal" },
};

export const DesktopCard: Story = {
  args: { layout: "card" },
};

export const Playground: Story = {
  args: {},
};

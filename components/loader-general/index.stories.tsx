import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Loader from ".";

const meta: Meta<typeof Loader> = {
  title: "Design System/Feedback/Loader",
  component: Loader,
  parameters: { layout: "centered" },
  args: {
    size: "md",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  ),
};

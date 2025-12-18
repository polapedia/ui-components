import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Skeleton from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Design System/Feedback/Loader Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  args: {
    className: "h-4 w-4",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-4 w-[250px]",
  },
};

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full",
  },
};

export const CardExample: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-[300px]">
      {/* Image */}
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-[250px]" />
        {/* Subtitle / Description */}
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

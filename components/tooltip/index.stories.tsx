import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Tooltip from ".";
import Button from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Design System/Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="py-20">
        <Story />
      </div>
    ),
  ],
  args: {
    content:
      "This is some tooltip text. Tooltip should be small and contain straight forward informative text.",
    placement: "top",
  },
  argTypes: {
    multiline: { control: "boolean" },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    onOpenChange: { action: "openChange" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover / Focus me</Button>
    </Tooltip>
  ),
};

export const Multiline: Story = {
  args: {
    multiline: true,
    maxWidthClassName: "max-w-[316px]",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover / Focus me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 items-center">
      <Tooltip {...args} placement="top" content="Top tooltip">
        <Button>Top</Button>
      </Tooltip>

      <div className="flex gap-6">
        <Tooltip {...args} placement="left" content="Left tooltip">
          <Button>Left</Button>
        </Tooltip>

        <Tooltip {...args} placement="right" content="Right tooltip">
          <Button>Right</Button>
        </Tooltip>
      </div>

      <Tooltip {...args} placement="bottom" content="Bottom tooltip">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
};

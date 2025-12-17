import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Banner from ".";
import PlusOne from "../icons/PlusOneIcon";

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-2.5 h-2.5 font-bold" />,
};

const meta: Meta<typeof Banner> = {
  title: "Design System/Display/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "info",
    title: "Banner Title",
    description: "Your text type here",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    leftIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "info",
    leftIcon: icons.PlusOne,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Banner
        variant="info"
        title="Banner Title"
        description="Your text type here"
      />
      <Banner
        variant="success"
        title="Banner Title"
        description="Your text type here"
      />
      <Banner
        variant="warning"
        title="Banner Title"
        description="Your text type here"
      />
      <Banner
        variant="danger"
        title="Banner Title"
        description="Your text type here"
      />
    </div>
  ),
};

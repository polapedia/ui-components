import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import StickyButton from ".";

const meta: Meta<typeof StickyButton> = {
  title: "Design System/Navigation & Action/Sticky Button",
  component: StickyButton,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
    variant: "primary",
    sticky: false,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: "radio",
      options: ["rectangle", "pill"],
    },
    sticky: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const VariantsShowcase: Story = {
  render: (args) => (
    <div className="w-[320px] rounded-3xl bg-white shadow-md px-6 py-6 space-y-5">
      <div className="flex flex-col gap-4">
        <StickyButton {...args} variant="primary" sticky={false}>
          Button
        </StickyButton>

        <StickyButton {...args} variant="secondary" sticky={false}>
          Button
        </StickyButton>

        <StickyButton {...args} variant="tertiary" sticky={false}>
          Button
        </StickyButton>
      </div>
    </div>
  ),
};

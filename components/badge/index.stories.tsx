import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from ".";
import PlusOne from "../icons/PlusOneIcon";

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-2.5 h-2.5 font-bold text-black" />,
};

const meta: Meta<typeof Badge> = {
  title: "Design System/Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Badge",
    variant: "primary",
    size: "lg",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "blue",
        "green",
        "brown",
        "red",
      ],
    },
    size: {
      control: "radio",
      options: ["lg", "md", "dot"],
    },
    leftIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: { variant: "primary", children: "Badge" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Badge" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "New", size: "md" },
};

export const Blue: Story = {
  args: { variant: "blue", children: "Info", size: "md" },
};

export const Green: Story = {
  args: { variant: "green", children: "Success", size: "md" },
};

export const Red: Story = {
  args: { variant: "red", children: "Error", size: "md" },
};

export const Brown: Story = {
  args: { variant: "brown", children: "Warning", size: "md" },
};

// Variants Showcase (grouped)
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Primary</span>
        <Badge variant="primary" size="lg">
          Polapedia Choice
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Secondary</span>
        <Badge variant="secondary" size="lg">
          Polapedia Choice
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Destructive</span>
        <Badge variant="destructive" size="md">
          New
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Semantic</span>
        <div className="flex gap-2">
          <Badge variant="blue" size="md">
            Info
          </Badge>
          <Badge variant="green" size="md">
            Success
          </Badge>
          <Badge variant="red" size="md">
            Error
          </Badge>
          <Badge variant="brown" size="md">
            Warning
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Sizes Showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Large</span>
        <Badge variant="primary" size="lg">
          Large
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Medium</span>
        <Badge variant="primary" size="md">
          9+
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-neutral-600">Dot</span>
        <Badge variant="green" size="dot" leftIcon={<span />} />
      </div>
    </div>
  ),
};

// Badge with Icons
export const WithIcons: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "With Icon",
    leftIcon: icons.PlusOne,
  },
};

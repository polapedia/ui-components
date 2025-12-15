import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from ".";
import { ReactElement } from "react";

const CustomBadge = () => (
  <span className="inline-flex items-center justify-center rounded-full border px-1 text-[10px] leading-none">
    New
  </span>
);

const icons: Record<string, ReactElement | null | undefined> = {
  None: null,
  "Custom badge": <CustomBadge />,
};

const meta: Meta<typeof Link> = {
  title: "Design System/Navigation & Action/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Link goes here",
    href: "https://example.com",
    variant: "no-underline",
    size: "md",
    withIcon: true,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["underline", "no-underline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    withIcon: {
      control: "boolean",
    },
    rightIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    href: {
      control: "text",
    },
    target: {
      control: "radio",
      options: ["_self", "_blank"],
    },
    className: {
      control: "text",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground / default story
export const Primary: Story = {};

// Variant Stories
export const Underline: Story = {
  args: { variant: "underline" },
};

export const NoUnderline: Story = {
  args: { variant: "no-underline" },
};

// Size Showcase
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Link {...args} size="sm">
        Small link
      </Link>
      <Link {...args} size="md">
        Medium link
      </Link>
      <Link {...args} size="lg">
        Large link
      </Link>
    </div>
  ),
  args: {
    href: "https://example.com",
    variant: "no-underline",
    withIcon: true,
  },
};

// Icon Showcase
export const WithCustomIcon: Story = {
  args: {
    rightIcon: <CustomBadge />,
    withIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    withIcon: false,
  },
};

// External Link
export const External: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noreferrer",
    variant: "underline",
  },
};

// Inline Usage Example
export const InlineTextUsage: Story = {
  render: (args) => (
    <p className="max-w-md text-sm text-neutral-800">
      This is an example sentence with an{" "}
      <Link {...args} href="https://example.com">
        inline link
      </Link>{" "}
      that appears within a paragraph of text.
    </p>
  ),
  args: {
    variant: "underline",
    size: "sm",
    withIcon: false,
  },
};

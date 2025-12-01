import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Chip from ".";
import ChevronDown from "../icons/ChevronDownIcon";
import CloseIcon from "../icons/CloseIcon";

const icons = {
  None: null,
  ChevronDown: <ChevronDown />,
  CloseIcon: <CloseIcon />,
};

const meta: Meta<typeof Chip> = {
  title: "Design System/Form/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Chips label",
    size: "sm",
    variant: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "avatar", "icon-left", "icon-right"],
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md"],
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
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Avatar: Story = {
  args: { variant: "avatar", leftIcon: "AB" },
};

export const IconLeft: Story = {
  args: { variant: "icon-left", leftIcon: <ChevronDown /> },
};

export const IconRight: Story = {
  args: { variant: "icon-right", rightIcon: <ChevronDown /> },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <Chip size="xs">XS</Chip>
      <Chip size="sm">SM</Chip>
      <Chip size="md">MD</Chip>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Chip {...args}>Default</Chip>
        <Chip {...args} disabled>
          Disabled
        </Chip>
        <Chip {...args} variant="icon-right" rightIcon={<CloseIcon />}>
          With Close
        </Chip>
        <Chip {...args} variant="icon-left" leftIcon={<ChevronDown />}>
          Icon Left
        </Chip>
        <Chip {...args} variant="avatar" leftIcon="AB">
          Avatar
        </Chip>
      </div>

      <p className="text-xs text-neutral-600">
        Hover to test <strong>hover</strong> and <strong>active</strong> states.
        Press <kbd>Tab</kbd> to test <strong>focus-visible</strong>.
      </p>
    </div>
  ),
  args: {
    size: "sm",
    variant: "default",
  },
};

export const WithLeftIcon: Story = {
  args: { leftIcon: <ChevronDown /> },
};

export const WithRightIcon: Story = {
  args: { variant: "icon-right", rightIcon: <ChevronDown /> },
};

export const WithCloseIcon: Story = {
  args: { variant: "icon-right", rightIcon: <CloseIcon /> },
};

export const Disabled: Story = {
  args: { disabled: true },
};

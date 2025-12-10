import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import Switch from ".";

const meta: Meta<typeof Switch> = {
  title: "Design System/Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    state: "default",
    disabled: false,
    checked: false,
    label: "Label",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Switch size",
    },
    state: {
      control: "radio",
      options: ["default", "error"],
      description: "Visual state for validation",
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Switch",
    // checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Switch",
    checked: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Switch {...args} size="sm" label="Small" />
      <Switch {...args} size="md" label="Medium" checked />
    </div>
  ),
};

// States
export const Error: Story = {
  args: {
    label: "Error state",
    state: "error",
    checked: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Switch {...args} disabled label="Disabled OFF" checked={false} />
      <Switch {...args} disabled label="Disabled ON" checked />
    </div>
  ),
};

// Interactive
export const InteractiveControlled: StoryFn<typeof Switch> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e) => {
        args.onChange?.(e);
        updateArgs({ checked: e.target.checked });
      }}
    />
  );
};

InteractiveControlled.args = {
  label: "Click to toggle (controlled)",
  checked: false,
};

import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { useState } from "react";
import Radio from ".";
import { RadioGroup } from "./RadioGroup";

// Meta for single Radio
const meta: Meta<typeof Radio> = {
  title: "Design System/Form/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    state: "default",
    disabled: false,
    required: false,
    label: "Radio label",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Radio size and label",
    },
    state: {
      control: "radio",
      options: ["default", "error"],
      description: "Visual state for validation",
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Single Radio
export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} size="sm" label="Small Radio (sm)" />
      <Radio {...args} size="md" label="Medium Radio (md)" />
    </div>
  ),
};

export const Error: Story = {
  args: {
    state: "error",
    helperText: "Please select one option",
    label: "Radio (Error)",
    checked: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} disabled label="Disabled Unchecked" />
      <Radio {...args} disabled checked label="Disabled Checked" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    helperText: "This helps user understand the context.",
  },
};

// Single Radio - function stories
// Controlled story - click radio will sync to panel Controls (checked)
export const InteractiveControlled: StoryFn<typeof Radio> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Radio
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
  checked: false,
  label: "Interactive Radio",
};

export const InteractiveLocalState: StoryFn<typeof Radio> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        args.onChange?.(e);
      }}
      label={args.label ?? "Radio with local state"}
    />
  );
};

// RadioGroup stories
type RadioGroupStory = StoryFn<typeof RadioGroup>;

const radioGroupBaseArgs: React.ComponentProps<typeof RadioGroup> = {
  size: "md",
  state: "default",
  disabled: false,
  required: false,
  label: "Payment Method",
  helperText: "Choose one of the available options.",
  options: [
    { value: "card", label: "Credit Card" },
    { value: "bank", label: "Bank Transfer" },
    { value: "gopay", label: "GoPay" },
  ],
};

export const GroupDefault: RadioGroupStory = (args) => {
  const [value, setValue] = useState<string | undefined>("card");

  return (
    <RadioGroup
      {...radioGroupBaseArgs}
      {...args}
      value={value}
      onChange={(val) => {
        setValue(val);
        args.onChange?.(val);
      }}
    />
  );
};

export const GroupDisabled: RadioGroupStory = (args) => {
  return (
    <RadioGroup
      {...radioGroupBaseArgs}
      {...args}
      disabled
      value="bank"
      helperText="All options are temporarily unavailable."
    />
  );
};

export const RadioGroupExample: RadioGroupStory = (args) => {
  const [value, setValue] = useState("dog");

  return (
    <RadioGroup
      {...args}
      label="Favorite Pet"
      helperText="Choose one"
      value={value}
      onChange={(val) => {
        setValue(val);
        args.onChange?.(val);
      }}
      options={[
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "hamster", label: "Hamster" },
      ]}
    />
  );
};

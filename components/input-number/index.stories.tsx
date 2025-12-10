import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import React, { useState } from "react";
import InputNumber from ".";

const meta: Meta<typeof InputNumber> = {
  title: "Design System/Form/Input Number",
  component: InputNumber,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    variant: "default",
    value: 1,
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      description: "Height size",
    },
    variant: {
      control: "radio",
      options: ["default", "fill", "stroke"],
      description: "Visual style: default / fill / stroke",
    },
    value: {
      control: { type: "number" },
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <InputNumber {...args} variant="default" />
      <InputNumber {...args} variant="fill" />
      <InputNumber {...args} variant="stroke" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <InputNumber {...args} size="sm" />
      <InputNumber {...args} size="md" />
      <InputNumber {...args} size="lg" />
      <InputNumber {...args} size="xl" />
      <InputNumber {...args} size="2xl" />
    </div>
  ),
};

// Interactive - sync with control panel (value)
export const InteractiveControlled: StoryFn<typeof InputNumber> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <InputNumber
      {...args}
      value={value}
      onChange={(val) => {
        updateArgs({ value: val });
        args.onChange?.(val);
      }}
    />
  );
};
InteractiveControlled.args = {
  value: 1,
};

export const InteractiveLocalState: StoryFn<typeof InputNumber> = (args) => {
  const [value, setValue] = useState(1);

  return (
    <InputNumber
      {...args}
      value={value}
      onChange={(val) => {
        setValue(val);
        args.onChange?.(val);
      }}
    />
  );
};
InteractiveLocalState.args = {
  variant: "fill",
  size: "lg",
};

import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { useState } from "react";
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
    value: 3,
    min: 1,
    max: 5,
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

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: number) => {
      updateArgs({ value: newValue });
      args.onChange?.(newValue);
    };

    return <InputNumber {...args} value={value} onChange={onChange} />;
  },
};

// Variants - Interactive (sync with Controls)
export const Variants: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: number) => {
      updateArgs({ value: newValue });
      args.onChange?.(newValue);
    };

    return (
      <div className="flex flex-col gap-4">
        <InputNumber
          {...args}
          variant="default"
          value={value}
          onChange={onChange}
        />
        <InputNumber
          {...args}
          variant="fill"
          value={value}
          onChange={onChange}
        />
        <InputNumber
          {...args}
          variant="stroke"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  },
};

// Sizes - Interactive (sync with Controls)
export const Sizes: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: number) => {
      updateArgs({ value: newValue });
      args.onChange?.(newValue);
    };

    return (
      <div className="flex flex-col gap-3">
        <InputNumber {...args} size="sm" value={value} onChange={onChange} />
        <InputNumber {...args} size="md" value={value} onChange={onChange} />
        <InputNumber {...args} size="lg" value={value} onChange={onChange} />
        <InputNumber {...args} size="xl" value={value} onChange={onChange} />
        <InputNumber {...args} size="2xl" value={value} onChange={onChange} />
      </div>
    );
  },
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

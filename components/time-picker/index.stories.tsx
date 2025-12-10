import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import TimePicker from "./index";

const meta: Meta<typeof TimePicker> = {
  title: "Design System/Form/Time Picker",
  component: TimePicker,
  parameters: { layout: "padded" },
  argTypes: {
    onChange: { action: "time-selected" },
  },
};

export default meta;

const Template: StoryFn<typeof TimePicker> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <TimePicker
      {...args}
      value={value}
      onChange={(val) => {
        updateArgs({ value: val });
        args.onChange?.(val);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select Time",
  value: undefined,
};

export const WithPreselectedValue = Template.bind({});
WithPreselectedValue.args = {
  value: "14.30",
  placeholder: "Select Time",
};

export const HourlyInterval = Template.bind({});
HourlyInterval.args = {
  interval: 60,
  placeholder: "Select Hour",
  value: undefined,
};

export const CustomInterval15Min = Template.bind({});
CustomInterval15Min.args = {
  interval: 15,
  placeholder: "00.00",
  value: undefined,
};

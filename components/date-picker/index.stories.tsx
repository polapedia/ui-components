import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DatePicker from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Design System/Form/Date Picker",
  component: DatePicker,
  parameters: { layout: "padded" },
  argTypes: {
    value: { control: "date" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: "Date Picker",
  },
};

export const WithValue: Story = {
  args: {
    label: "Date Picker",
    value: new Date(2025, 11, 9),
  },
};

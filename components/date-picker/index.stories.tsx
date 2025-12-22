import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DatePicker from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Design System/Form/Date Picker",
  component: DatePicker,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-[450px] bg-neutral-100 p-5">
        <Story />
      </div>
    ),
  ],
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

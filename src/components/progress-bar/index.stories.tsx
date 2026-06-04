import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressBar from '.';

const meta: Meta<typeof ProgressBar> = {
  title: 'Design System/Display/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 50,
    max: 100,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'number', min: 0 },
    },
    max: {
      control: { type: 'number', min: 1 },
    },
    fill: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">Size SM</span>
        <ProgressBar {...args} size="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">Size MD</span>
        <ProgressBar {...args} size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">Size LG</span>
        <ProgressBar {...args} size="lg" />
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    value: 75,
    fill: 'linear-gradient(to right, #4caf50, #81c784)',
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">0%</span>
        <ProgressBar {...args} value={0} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">50%</span>
        <ProgressBar {...args} value={50} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500 font-mono">100%</span>
        <ProgressBar {...args} value={100} />
      </div>
    </div>
  ),
};

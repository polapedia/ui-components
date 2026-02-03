import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite';
import Checkbox from '.';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
    label: 'Checkbox label',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Checkbox and label size',
    },
    state: {
      control: 'radio',
      options: ['default', 'error'],
      description: 'Visual state for validation',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {};

// Checked State
export const Checked: Story = {
  args: {
    checked: true,
  },
};

// Sizes Showcase
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} size="sm" label="Small Checkbox (sm)" />
      <Checkbox {...args} size="md" label="Medium Checkbox (md)" />
    </div>
  ),
};

// Validation States
export const Error: Story = {
  args: {
    state: 'error',
    helperText: 'You must agree to the terms',
    label: 'Agree to Terms (Error)',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox disabled label="Disabled Unchecked" />
      <Checkbox disabled checked label="Disabled Checked" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    helperText: 'This helps user understand the context.',
  },
};

// Interactive Showcase
export const Showcase: StoryFn<typeof Checkbox> = (args) => {
  {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    return (
      <div className="flex flex-col gap-6 w-[300px]">
        <h3 className="text-xl font-bold text-gray-800">Checkbox</h3>
        <p className="text-gray-500 mb-2">
          Intended for multiple selection, but still allow single-select.
        </p>

        {/* Single */}
        <Checkbox
          {...args}
          checked={checked1}
          onChange={(e) => setChecked1(e.target.checked)}
        />

        {/* Group */}
        <div className="flex flex-col gap-4 p-4 border border-dashed border-purple-300 rounded-lg">
          <Checkbox {...args} label="Checkbox label 1" />
          <Checkbox {...args} checked={true} label="Checkbox label 2" />
          <Checkbox {...args} label="Checkbox label 3" />
          <Checkbox
            {...args}
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
            label="Checkbox label 4"
          />
        </div>
      </div>
    );
  }
};

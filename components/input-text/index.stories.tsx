import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite';
import Input from '.';
import HomeIcon from '../icons/HomeIcon';
import PlusOneIcon from '../icons/PlusOneIcon';
import { useState } from 'react';
import { action } from 'storybook/actions';

const icons = {
  None: null,
  Home: <HomeIcon className="w-6 h-6" />,
  PlusOne: <PlusOneIcon className="w-6 h-6" />,
};

const meta: Meta<typeof Input> = {
  title: 'Design System/Form/Input Text',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Label text',
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
    isClearable: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Input field size',
    },
    state: {
      control: 'radio',
      options: ['default', 'error', 'success'],
      description: 'Visual state for validation',
    },
    leftIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
      description: 'Icon or element on the left',
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
      description: 'Icon or element on the right',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    helperText: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    onClear: { action: 'cleared' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: { state: 'default' },
};

// Size Showcase
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} size="sm" placeholder="Small Input (sm)" />
      <Input {...args} size="md" placeholder="Medium Input (md)" />
    </div>
  ),
};

// Validation States
export const Error: Story = {
  args: {
    state: 'error',
    value: 'label text',
    helperText: 'You just type wrong email',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    value: 'Valid input',
    helperText: 'Username is available',
  },
};

// Feature Variants
export const WithIcon: Story = {
  args: {
    leftIcon: icons.Home,
    placeholder: 'Input with Left Icon',
    state: 'default',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'This field is required',
    label: 'Label',
  },
};

export const Clearable: StoryFn<typeof Input> = (args) => {
  const [val, setVal] = useState('Click X to clear');

  return (
    <div>
      <Input
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClear={() => {
          setVal('');
          action('onClear triggered')();
        }}
      />
    </div>
  );
};
Clearable.args = {
  isClearable: true,
  placeholder: 'Type something...',
};

export const Showcase: Story = {
  render: (args) => (
    <div className="flex flex-col gap-5 w-[400px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Visual States
        </h3>

        {/* Default with Icon */}
        <Input {...args} leftIcon={icons.PlusOne} placeholder="Label text" />

        {/* Clearable */}
        <Input
          {...args}
          isClearable
          value="Input text"
          leftIcon={icons.PlusOne}
          onClear={() => {}}
        />

        {/* Required */}
        <Input {...args} required placeholder="Label text" />

        {/* Disabled */}
        <Input
          {...args}
          disabled
          placeholder="Label text"
          required
          className="bg-gray-100"
        />

        {/* Error */}
        <Input
          {...args}
          state="error"
          placeholder="Label text"
          required
          value="Error Value"
        />

        {/* Success */}
        <Input
          {...args}
          state="success"
          placeholder="Label text"
          required
          value="Success Value"
        />
      </div>

      <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <p className="text-xs text-neutral-600 mb-2">
          Interact with the inputs above to test <strong>focus rings</strong>{' '}
          and
          <strong> hover states</strong>.
        </p>
      </div>
    </div>
  ),
  args: {
    size: 'md',
  },
};

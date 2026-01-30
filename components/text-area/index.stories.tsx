import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextArea from '.';
import AlertIcon from '../icons/AlertIcon';
import CheckIcon from '../icons/CheckIcon';
import PlusOneIcon from '../icons/PlusOneIcon';

const icons = {
  None: null,
  Alert: <AlertIcon className="w-5 h-5 text-gray-400" />,
  Check: <CheckIcon className="w-5 h-5 text-green-500" />,
  PlusOne: <PlusOneIcon className="w-5 h-5" />,
};

const meta: Meta<typeof TextArea> = {
  title: 'Design System/Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-100 p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: '',
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
    label: 'Text area label',
    helperText: '',
    rightIcon: icons.PlusOne,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Text area height size',
    },
    state: {
      control: 'radio',
      options: ['default', 'error', 'success'],
      description: 'Visual state for validation',
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
      description: 'Icon in the top right corner',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
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
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block">
          SIZE: SM (120px)
        </span>
        <TextArea {...args} size="sm" placeholder="Small Text Area (sm)" />
      </div>
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block">
          SIZE: MD (150px)
        </span>
        <TextArea {...args} size="md" placeholder="Medium Text Area (md)" />
      </div>
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block">
          SIZE: LG (200px)
        </span>
        <TextArea {...args} size="lg" placeholder="Large Text Area (lg)" />
      </div>
    </div>
  ),
  args: {
    label: 'Description',
  },
};

// Validation States
export const Error: Story = {
  args: {
    state: 'error',
    value: 'This text is too long or invalid...',
    helperText: 'Character limit exceeded or invalid format',
    label: 'Error State',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    value: 'Valid description provided.',
    helperText: 'Description looks good!',
    label: 'Success State',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This content is read-only and cannot be edited.',
    label: 'Disabled State',
    helperText: 'Background becomes gray',
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'This field is required',
    label: 'Mandatory Field',
  },
};

// Auto Validation Logic Demo (Max 500 chars)
export const AutoValidationDemo: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <TextArea
        {...args}
        helperText="Try typing > 500 characters to see it turn red automatically."
        placeholder="Start typing..."
      />
    </div>
  ),
  args: {
    label: 'Auto Validation (Max 500 chars)',
  },
};

export const Showcase: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 w-[500px]">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">
          Visual States
        </h3>

        {/* Default */}
        <TextArea {...args} placeholder="Default state..." />

        {/* Required */}
        <TextArea
          {...args}
          required
          placeholder="Required field..."
          label="Required Label"
        />

        {/* With Icon */}
        <TextArea
          {...args}
          rightIcon={icons.Check}
          label="With Top-Right Icon"
          placeholder="Notice the icon in the corner"
        />

        {/* Disabled */}
        <TextArea
          {...args}
          disabled
          label="Disabled"
          value="Disabled content"
        />

        {/* Error */}
        <TextArea
          {...args}
          state="error"
          label="Error State"
          value="Invalid value"
          helperText="Error message details"
        />

        {/* Success */}
        <TextArea
          {...args}
          state="success"
          label="Success State"
          value="Valid value"
          helperText="Success message"
        />
      </div>

      <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <p className="text-xs text-neutral-600">
          Interact with the text areas above to test{' '}
          <strong>focus rings</strong>,<strong> hover states</strong>, and{' '}
          <strong>character limits</strong>.
        </p>
      </div>
    </div>
  ),
  args: {
    size: 'md',
  },
};

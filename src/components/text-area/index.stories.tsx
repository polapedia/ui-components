import type { Meta, StoryObj } from '@storybook/react-vite';
import TextArea from '.';
import AlertIcon from '../icons/AlertIcon';
import CheckIcon from '../icons/CheckIcon';
import PlusOneIcon from '../icons/PlusOneIcon';

const icons = {
  None: null,
  Alert: <AlertIcon className="w-5 h-5 text-accents-red" />,
  Check: <CheckIcon className="w-5 h-5 text-accents-green" />,
  PlusOne: <PlusOneIcon className="w-5 h-5" />,
};

const meta: Meta<typeof TextArea> = {
  title: 'Design System/Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  args: {
    placeholder: 'Enter text here...',
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
    label: 'Text area label',
    helperText: 'This is helper text',
    maxLength: 500,
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
      description: 'Icon in the top right corner (overridden by state icons)',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    maxLength: { control: 'number' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { state: 'default' },
};

export const WithStroke: Story = {
  args: {
    label: '',
    helperText: '',
  },
  render: (args) => (
    <div className="p-4">
      <TextArea
        {...args}
        className="border border-neutral-900 focus-within:border-none"
      />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    label: '',
    helperText: '',
  },
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block uppercase">
          Size SM (120px)
        </span>
        <TextArea {...args} size="sm" placeholder="Small Text Area" />
      </div>
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block uppercase">
          Size MD (150px)
        </span>
        <TextArea {...args} size="md" placeholder="Medium Text Area" />
      </div>
      <div>
        <span className="text-xs font-bold text-gray-400 mb-2 block uppercase">
          Size LG (200px)
        </span>
        <TextArea {...args} size="lg" placeholder="Large Text Area" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-xl">
      <TextArea
        {...args}
        state="default"
        label="Default State"
        placeholder="Type something..."
      />
      <TextArea
        {...args}
        state="error"
        label="Error State"
        helperText="There is an error with your input"
        defaultValue="Invalid input content"
      />
      <TextArea
        {...args}
        state="success"
        label="Success State"
        helperText="Everything looks good!"
        defaultValue="Valid input content"
      />
    </div>
  ),
};

export const CharacterLimit: Story = {
  args: {
    label: 'Character Limit (Max 50)',
    maxLength: 50,
    helperText: 'You can only type up to 50 characters',
    placeholder: 'Try to exceed 50 characters...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Text Area',
    value: 'This content cannot be edited',
    helperText: 'Component is currently disabled',
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Field',
    placeholder: 'This field is mandatory',
  },
};

export const CustomIcon: Story = {
  args: {
    label: 'Custom Top Icon',
    rightIcon: icons.PlusOne,
    placeholder: 'Notice the custom icon in the top right corner',
  },
};

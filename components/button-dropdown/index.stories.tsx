import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonDropdown from '.';
import PlusOne from '../icons/PlusOneIcon';

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-4 h-4 text-black" />,
};

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Design System/Navigation & Action/Button Dropdown',
  component: ButtonDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'This is the example of trigger action that button dropdown has.',
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'error', 'inverted', 'disabled'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    children: { control: 'text' },
    leftIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Inverted: Story = {
  args: { variant: 'inverted' },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Disabled: Story = {
  args: { variant: 'disabled' },
};

// Size Showcase
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-start gap-4 h-48">
      <ButtonDropdown {...args} size="sm" label="Small" />
      <ButtonDropdown {...args} size="md" label="Medium" />
      <ButtonDropdown {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

// UI States Showcase
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 h-64">
      <div className="flex gap-4">
        <ButtonDropdown {...args} label="Default" />
        <ButtonDropdown {...args} label="Disabled" disabled />
        <ButtonDropdown {...args} label="Error" variant="error" />
      </div>

      <p className="text-xs text-neutral-600">
        Click the button to see the <strong>dropdown</strong> content.
        <br />
        Note: The dropdown works on click, not hover.
      </p>
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const CustomContent: Story = {
  args: {
    label: 'Menu',
    children: (
      <ul className="flex flex-col gap-2 min-w-[150px]">
        <li className="cursor-pointer hover:underline">Profile</li>
        <li className="cursor-pointer hover:underline">Settings</li>
        <hr className="border-white/20" />
        <li className="cursor-pointer hover:underline text-red-300">Logout</li>
      </ul>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    label: 'With Icons',
    leftIcon: icons.PlusOne,
    rightIcon: icons.PlusOne,
  },
};

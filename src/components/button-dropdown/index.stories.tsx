import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonDropdown from '.';
import PlusOne from '../icons/PlusOneIcon';
import type { DropdownItem } from './types';

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-4 h-4 text-black" />,
};

const sampleItems: DropdownItem[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3 (Disabled)', value: '3', disabled: true },
  { label: 'Danger Option', value: '4', variant: 'danger' },
];

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Design System/Navigation & Action/Button Dropdown',
  component: ButtonDropdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Select Option',
    triggerVariant: 'primary',
    menuVariant: 'default',
    size: 'md',
    shape: 'pill',
    disabled: false,
    showDivider: true,
    updateLabelOnSelect: true,
    placeholder: 'Select Option',
    items: sampleItems,
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    triggerVariant: {
      control: 'select',
      options: ['primary', 'error', 'inverted', 'disabled', 'outline', 'ghost'],
    },
    menuVariant: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'radio',
      options: ['pill', 'rounded', 'square'],
    },
    itemSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    showDivider: { control: 'boolean' },
    updateLabelOnSelect: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
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
    onItemSelect: { action: 'onItemSelect' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: {
    triggerVariant: 'primary',
    menuVariant: 'light',
    shape: 'square',
    size: 'md',
  },
};

export const Outline: Story = {
  args: { triggerVariant: 'outline' },
};

export const Ghost: Story = {
  args: { triggerVariant: 'ghost' },
};

export const Inverted: Story = {
  args: { triggerVariant: 'inverted' },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ErrorState: Story = {
  args: { triggerVariant: 'error' },
};

export const Disabled: Story = {
  args: { triggerVariant: 'disabled', disabled: true },
};

// Menu Variants
export const DarkMenu: Story = {
  args: { menuVariant: 'dark' },
};

export const LightMenu: Story = {
  args: { menuVariant: 'light' },
};

// Size Showcase
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-start gap-4 h-64">
      <ButtonDropdown {...args} size="sm" label="Small" />
      <ButtonDropdown {...args} size="md" label="Medium" />
      <ButtonDropdown {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    triggerVariant: 'primary',
  },
};

// UI States Showcase
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 h-80">
      <div className="flex gap-4">
        <ButtonDropdown {...args} label="Default" />
        <ButtonDropdown {...args} label="Disabled" disabled />
        <ButtonDropdown {...args} label="No Divider" showDivider={false} />
      </div>

      <p className="text-xs text-neutral-600">
        Click the button to see the <strong>dropdown</strong> content.
      </p>
    </div>
  ),
  args: {
    triggerVariant: 'primary',
    size: 'md',
  },
};

export const StructuredItems: Story = {
  args: {
    label: 'Select Option',
    items: sampleItems,
  },
};

export const CustomContent: Story = {
  args: {
    label: 'Custom Content',
    items: [],
    children: (
      <ul className="flex flex-col gap-2 min-w-[150px] p-2">
        <li className="cursor-pointer hover:underline text-sm">Profile</li>
        <li className="cursor-pointer hover:underline text-sm">Settings</li>
        <hr className="border-neutral-200" />
        <li className="cursor-pointer hover:underline text-sm text-red-500">
          Logout
        </li>
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

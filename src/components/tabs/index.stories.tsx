import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import Tabs, { type TabsProps } from '.';
import HomeIcon from '../icons/HomeIcon';
import PlusOneIcon from '../icons/PlusOneIcon';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Navigation & Action/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  args: {
    tabs: [
      { label: 'Overview', value: 'overview', href: '/overview' },
      { label: 'Details', value: 'details' },
      { label: 'Settings', value: 'settings' },
    ],
    value: 'overview',
    variant: 'underline',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        'underline',
        'underline-full',
        'pills',
        'rectangle',
        'contained',
      ],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'top'],
    },
    onValueChange: { action: 'onValueChange' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const createRender = (extraProps?: Partial<TabsProps>): Story['render'] => {
  return function Render(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
      <Tabs
        {...args}
        {...extraProps}
        value={value}
        onValueChange={(val) => {
          args.onValueChange?.(val);
          updateArgs({ value: val });
        }}
      />
    );
  };
};

export const Primary: Story = {
  render: createRender(),
};

export const Underline: Story = {
  render: createRender(),
  args: { variant: 'underline' },
};

export const UnderlineFull: Story = {
  render: createRender(),
  args: { variant: 'underline-full' },
};

export const UnderlineFullWidth: Story = {
  render: createRender({ className: 'w-full' }),
  args: { variant: 'underline-full' },
};

export const Pills: Story = {
  render: createRender(),
  args: { variant: 'pills' },
};

export const Rectangle: Story = {
  render: createRender(),
  args: { variant: 'rectangle' },
};

export const Contained: Story = {
  render: createRender({ className: 'max-w-md' }),
  args: { variant: 'contained' },
};

export const WithIcons: Story = {
  render: createRender(),
  args: {
    tabs: [
      { label: 'Home', value: 'home', icon: <HomeIcon className="size-5" /> },
      {
        label: 'Profile',
        value: 'profile',
        icon: <PlusOneIcon className="size-5" />,
      },
      { label: 'Settings', value: 'settings' },
    ],
    value: 'home',
  },
};

export const IconPositionTop: Story = {
  render: createRender(),
  args: {
    tabs: [
      { label: 'Home', value: 'home', icon: <HomeIcon className="size-6" /> },
      {
        label: 'Profile',
        value: 'profile',
        icon: <PlusOneIcon className="size-6" />,
      },
    ],
    value: 'home',
    iconPosition: 'top',
  },
};

export const AsLinks: Story = {
  args: {
    tabs: [
      { label: 'Go to Google', value: 'google', href: 'https://google.com' },
      { label: 'Go to GitHub', value: 'github', href: 'https://github.com' },
    ],
    value: 'google',
  },
};

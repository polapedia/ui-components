import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import Button from '.';
import Link from 'next/link';
import Home from '../icons/HomeIcon';
import { RouterButton } from './RouterButton';

const icons = {
  None: null,
  Home: <Home />,
};

const meta: Meta<typeof Button> = {
  title: 'Design System/Navigation & Action/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-background-hover flex justify-center items-center p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    shape: 'rectangle',
    leftIcon: icons.Home,
    rightIcon: icons.Home,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'outline-primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon-sm', 'icon-md', 'icon-lg'],
    },
    shape: {
      control: 'radio',
      options: ['rectangle', 'pill', 'circle'],
    },
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
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const OutlinePrimary: Story = {
  args: { variant: 'outline-primary' },
};

// Size Showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Shape Showcase
export const Rectangle: Story = {
  args: { shape: 'rectangle' },
};

export const Pill: Story = {
  args: { shape: 'pill' },
};

export const Circle: Story = {
  args: { shape: 'circle', children: <Home /> },
};

export const Shapes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button shape="rectangle" {...args}>
        Rectangle
      </Button>
      <Button shape="pill" {...args}>
        Pill
      </Button>
      <Button shape="circle" leftIcon={<Home />} {...args} />
    </div>
  ),
};

// UI States Showcase
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button {...args}>Default</Button>
        <Button {...args} disabled>
          Disabled
        </Button>
        <Button {...args} isLoading>
          Loading
        </Button>
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="tertiary">
          Tertiary
        </Button>
      </div>

      <p className="text-xs text-neutral-600">
        Use your mouse to test <strong>hover</strong> and
        <strong>active/pressed</strong> states. Press <kbd>Tab</kbd> to observe
        the <strong>focus</strong> state.
      </p>
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rectangle',
  },
};

// Misc
export const Loading: Story = {
  args: { isLoading: true },
};

export const CircleWithIcon: Story = {
  args: { shape: 'circle', leftIcon: <Home /> },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  render: (args) => (
    <Link
      href="/coming-soon"
      onClick={(e) => {
        e.preventDefault();
        action('next/link click')('/coming-soon');
      }}
    >
      <Button {...args}>Button as Link</Button>
    </Link>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rectangle',
  },
};

export const WithRouterNavigation: Story = {
  render: (args) => <RouterButton {...args} />,
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rectangle',
  },
};

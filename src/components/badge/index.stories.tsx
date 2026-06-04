import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '.';
import PlusOne from '../icons/PlusOneIcon';

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-2.5 h-2.5" />,
};

const meta: Meta<typeof Badge> = {
  title: 'Design System/Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Polapedia choice',
    variant: 'primary',
    size: 'm',
    color: 'red',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    color: {
      control: 'select',
      options: ['red', 'neutral', 'danger', 'warning', 'success', 'info'],
    },
    size: {
      control: 'radio',
      options: ['m', 'l'],
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
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(
        ['red', 'neutral', 'danger', 'warning', 'success', 'info'] as const
      ).map((color) => (
        <div key={color} className="flex gap-2 items-center">
          <span className="w-20 text-xs font-mono">{color}</span>
          <Badge {...args} color={color} variant="primary">
            Primary
          </Badge>
          <Badge {...args} color={color} variant="secondary">
            Secondary
          </Badge>
          <Badge {...args} color={color} variant="tertiary">
            Tertiary
          </Badge>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Badge {...args} size="m">
        Size m
      </Badge>
      <Badge {...args} size="l">
        Size l
      </Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    leftIcon: icons.PlusOne,
    rightIcon: icons.PlusOne,
  },
};

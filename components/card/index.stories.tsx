import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Card from '.';
import HomeIcon from '../icons/HomeIcon';
import PlusOneIcon from '../icons/PlusOneIcon';

const icons = {
  None: null,
  Home: <HomeIcon className="w-4 h-4 tab:w-6 tab:h-6" />,
  PlusOne: <PlusOneIcon className="w-3 h-3 tab:w-4 tab:h-4" />,
};

const meta: Meta<typeof Card> = {
  title: 'Design System/Display/Card',
  component: Card,
  args: {
    title: 'Tittle',
    subtitle: 'Secondary Text',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    rating: 4,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['product', 'simple'],
      description: 'Card display variations',
    },
    topIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    onButtonClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const ProductDefault: Story = {
  args: {
    variant: 'product',
    topIcon: icons.Home,
    buttonText: 'View Product',
    rightIcon: icons.PlusOne,
    imageSrc: '/images/house.jpeg',
  },
  decorators: [(Story) => <Story />],
};

export const SimpleDefault: Story = {
  args: {
    variant: 'simple',
    topIcon: icons.Home,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    subtitle: undefined,
    rating: undefined,
    buttonText: undefined,
  },
  decorators: [(Story) => <Story className="h-full" />],
};

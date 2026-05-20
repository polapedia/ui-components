import type { Meta, StoryObj } from '@storybook/react-vite';
import Breadcrumb from '.';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Design System/Navigation & Action/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('a')) {
            e.preventDefault();
          }
        }}
        onKeyDown={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('a') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
          }
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Detail' },
    ],
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the font and icon size of the breadcrumb',
    },
    separator: {
      control: 'select',
      options: ['Default (ChevronRight)', 'Slash'],
      mapping: {
        'Default (ChevronRight)': undefined,
        Slash: '/',
      },
      description: 'Custom separator element between breadcrumb items',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes for the root element',
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Kategori', href: '/marketplace/kategori' },
      { label: 'Desain Rumah', href: '/marketplace/kategori/desain-rumah' },
      { label: 'Produk Detail' },
    ],
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Current Page' },
    ],
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Current Page' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    size: 'md',
    separator: '/',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Current Page' },
    ],
  },
};

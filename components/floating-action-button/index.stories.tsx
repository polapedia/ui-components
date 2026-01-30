import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FloatingActionButton from './index';
import HomeIcon from '../icons/HomeIcon';
import PlusIcon from '../icons/PlusIcon';

const icons = {
  None: null,
  Home: <HomeIcon />,
  Plus: <PlusIcon />,
};

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Design System/Navigation & Action/Floating Action Button',
  component: FloatingActionButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'danger'],
    },
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'lg',
  },
};

const EditIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const WithCustomIcon: Story = {
  args: {
    variant: 'primary',
    icon: <EditIcon />,
  },
};

export const StickyBottomRight: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: (args) => (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">Example page with FAB</h2>
        <p>
          This FAB is positioned <strong>sticky</strong> in bottom right corner
          using tailwind utility class.
        </p>
      </div>

      <FloatingActionButton
        {...args}
        className={`fixed bottom-6 right-6 ${args.className ?? ''}`}
        aria-label="Create new item"
      />
    </div>
  ),
};

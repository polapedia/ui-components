import type { Meta, StoryObj, StoryFn } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Pagination, { PaginationProps } from '.';
import { action } from 'storybook/actions';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Navigation & Action/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  args: {
    page: 1,
    totalPages: 100,
    siblingCount: 1,
    size: 'md',
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current active page (1-based)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Number of pages shown on each side of the current page',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination buttons',
    },
    onChange: { action: 'pageChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    page: 1,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    page: 5,
  },
};

export const Interactive: StoryFn<PaginationProps> = (args) => {
  const [page, setPage] = useState(args.page ?? 1);

  return (
    <div className="flex flex-col gap-3 items-center">
      <Pagination
        {...args}
        page={page}
        onChange={(next) => {
          setPage(next);
          action('onChange')(next);
        }}
      />
      <div className="text-sm text-gray-500">Current page: {page}</div>
    </div>
  );
};

Interactive.args = {
  page: 1,
  totalPages: 100,
  siblingCount: 1,
  size: 'md',
};

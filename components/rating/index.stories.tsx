import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import StarRating from '.';

const meta: Meta<typeof StarRating> = {
  title: 'Design System/Display/Rating',
  component: StarRating,
  parameters: { layout: 'padded' },
  args: {
    value: 3,
    max: 5,
    interactive: false,
    starSize: 24,
  },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    interactive: { control: 'boolean' },
    starSize: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Size of each star in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReadOnly: Story = {
  args: {
    value: 4,
    interactive: false,
    starSize: 20,
  },
};

export const Interactive: StoryFn<typeof StarRating> = (args) => {
  const [rating, setRating] = useState(args.value ?? 0);

  return (
    <div className="flex flex-col gap-3">
      <StarRating
        {...args}
        value={rating}
        interactive
        onValueChange={setRating}
      />

      <span className="text-sm text-slate-600">
        Rating: <strong>{rating}</strong>
      </span>
    </div>
  );
};

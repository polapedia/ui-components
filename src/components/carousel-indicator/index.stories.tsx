import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import CarouselIndicator from '.';
import type { CarouselIndicatorProps } from './types';

function InteractiveCarouselIndicator(props: Readonly<CarouselIndicatorProps>) {
  const { activeIndex = 0, onActiveChange, ...rest } = props;
  const [active, setActive] = useState(activeIndex);

  return (
    <CarouselIndicator
      {...rest}
      activeIndex={active}
      onActiveChange={(nextIndex) => {
        setActive(nextIndex);
        onActiveChange?.(nextIndex);
      }}
    />
  );
}

const meta: Meta<typeof CarouselIndicator> = {
  title: 'Design System/Display/Carousel Indicator',
  component: CarouselIndicator,
  parameters: { layout: 'centered' },
  args: {
    size: 'md',
    total: 6,
    activeIndex: 2,
    disabled: false,
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    total: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    activeIndex: { control: { type: 'number', min: 0, max: 19, step: 1 } },
    disabled: { control: 'boolean' },
    onActiveChange: { action: 'onActiveChange' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <InteractiveCarouselIndicator {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">sm</span>
        <InteractiveCarouselIndicator
          {...args}
          size="sm"
          total={8}
          activeIndex={0}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">md</span>
        <InteractiveCarouselIndicator
          {...args}
          size="md"
          total={7}
          activeIndex={2}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">lg</span>
        <InteractiveCarouselIndicator
          {...args}
          size="lg"
          total={6}
          activeIndex={4}
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <InteractiveCarouselIndicator {...args} />,
};

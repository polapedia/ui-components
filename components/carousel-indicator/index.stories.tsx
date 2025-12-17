import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import CarouselIndicator from ".";

const meta: Meta<typeof CarouselIndicator> = {
  title: "Design System/Display/Carousel Indicator",
  component: CarouselIndicator,
  parameters: { layout: "centered" },
  args: {
    size: "md",
    total: 6,
    activeIndex: 2,
    disabled: false,
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    total: { control: { type: "number", min: 0, max: 20, step: 1 } },
    activeIndex: { control: { type: "number", min: 0, max: 19, step: 1 } },
    disabled: { control: "boolean" },
    onActiveChange: { action: "onActiveChange" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">sm</span>
        <CarouselIndicator {...args} size="sm" total={8} activeIndex={0} />
      </div>

      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">md</span>
        <CarouselIndicator {...args} size="md" total={7} activeIndex={2} />
      </div>

      <div className="flex items-center gap-3">
        <span className="w-10 text-xs text-content-secondary">lg</span>
        <CarouselIndicator {...args} size="lg" total={6} activeIndex={4} />
      </div>
    </div>
  ),
};

export const Interactive: StoryFn<typeof CarouselIndicator> = (args) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 items-start">
      <CarouselIndicator
        {...args}
        activeIndex={active}
        onActiveChange={(i) => setActive(i)}
      />

      <div className="text-[14px] text-content-secondary">
        Active index: <span className="text-black">{active}</span>
      </div>
    </div>
  );
};
Interactive.args = { size: "md", total: 6 };

export const Disabled: Story = {
  args: { disabled: true },
};

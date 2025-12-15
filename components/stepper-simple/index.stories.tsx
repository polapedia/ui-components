import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import SimpleStepper, { SimpleStepItem } from ".";
import PlusOneIcon from "../icons/PlusOneIcon";
import Button from "../button";
import { action } from "storybook/actions";

const SystemIcon = ({ symbol }: { symbol: string }) => (
  <span className="inline-flex items-center justify-center w-full h-full rounded bg-blue-50 text-blue-600 font-bold">
    {symbol}
  </span>
);

const baseSteps: SimpleStepItem[] = [
  { prefix: "+1", label: "Step label 1" },
  { prefix: "+1", label: "Step label 2" },
  { prefix: "+1", label: "Step label 3" },
  { prefix: "+1", label: "Step label 4" },
];

const meta: Meta<typeof SimpleStepper> = {
  title: "Design System/Navigation & Action/Simple Stepper",
  component: SimpleStepper,
  parameters: { layout: "padded" },
  args: {
    steps: baseSteps,
    activeIndex: 0,
    size: "md",
    activeColorClass:
      "bg-linear-to-b from-gradient-primary to-gradient-secondary",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    activeIndex: { control: { type: "number", min: 0, max: 3 } },
    activeColorClass: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    steps: [
      {
        label: "Cart Information",
        leftIcon: <SystemIcon symbol="🛒" />,
        prefix: "Step 1",
      },
      {
        label: "Shipping Address",
        leftIcon: <PlusOneIcon className="w-4 h-4 text-black" />,
        prefix: "Step 2",
      },
      {
        label: "Payment Method",
        leftIcon: <SystemIcon symbol="💳" />,
        prefix: "Step 3",
      },
      {
        label: "Review Order",
        leftIcon: <SystemIcon symbol="✅" />,
        prefix: "Step 4",
      },
    ],
    activeIndex: 1,
  },
};

export const Interactive: StoryFn<typeof SimpleStepper> = (args) => {
  const steps: SimpleStepItem[] = [
    { label: "User Info", leftIcon: "👤", prefix: "+1" },
    { label: "Preferences", leftIcon: "⚙️", prefix: "+1" },
    { label: "Confirm", leftIcon: "👍", prefix: "+1" },
  ];

  const [activeIndex, setActiveIndex] = useState(args.activeIndex ?? 0);
  const currentStep = steps[activeIndex];

  const handleNext = () => {
    const nextIndex = Math.min(activeIndex + 1, steps.length - 1);

    action("Next clicked")({
      index: nextIndex,
      step: steps[nextIndex],
      previous: { index: activeIndex, step: currentStep },
    });

    setActiveIndex(nextIndex);
  };

  const handleReset = () => {
    action("Reset clicked")({ index: 0, step: steps[0] });
    setActiveIndex(0);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md p-4 border border-dashed border-slate-200 rounded-lg">
      <SimpleStepper {...args} steps={steps} activeIndex={activeIndex} />

      <div className="flex gap-3 mt-2">
        <Button
          onClick={handleNext}
          disabled={activeIndex === steps.length - 1}
          shape="pill">
          Next
        </Button>
        <Button onClick={handleReset} variant="tertiary" shape="pill">
          Reset
        </Button>
      </div>
    </div>
  );
};

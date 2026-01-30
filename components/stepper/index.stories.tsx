import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Stepper, { StepItem } from '.';
import PlusOneIcon from '../icons/PlusOneIcon';
import Button from '../button';
import { action } from 'storybook/actions';

// Sample Icon
const ProductIcon = ({ symbol }: { symbol: string }) => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-50 text-amber-500 text-sm border border-amber-100">
    {symbol}
  </span>
);

// Base Steps
const baseSteps: StepItem[] = [
  {
    prefix: '+1',
    label: 'Account Details',
    description: 'Setup your account',
  },
  {
    prefix: '+1',
    label: 'Shipping Info',
    description: 'Enter shipping address',
  },
  {
    prefix: '+1',
    label: 'Payment',
    description: 'Select payment method',
  },
];

const meta: Meta<typeof Stepper> = {
  title: 'Design System/Navigation & Action/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
  args: {
    steps: baseSteps,
    activeIndex: 0,
    orientation: 'horizontal',
    size: 'md',
    clickable: false,
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    activeIndex: {
      control: { type: 'number', min: 0, max: baseSteps.length - 1, step: 1 },
    },
    clickable: { control: 'boolean' },
    steps: { control: 'object' },
    onStepChange: { action: 'step-changed', table: { disable: true } },
    renderStep: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'max-w-xs',
    clickable: true,
  },
};

// With icon
export const WithIcons: Story = {
  args: {
    steps: [
      {
        label: 'Select Items',
        description: 'Cart summary',
        leftIcon: <ProductIcon symbol="🛒" />,
      },
      {
        label: 'Payment',
        description: 'Bill amount',
        leftIcon: <PlusOneIcon className="w-4 h-4 text-black" />,
      },
      {
        label: 'Delivery',
        description: 'Track order',
        leftIcon: <ProductIcon symbol="🚚" />,
      },
    ],
    activeIndex: 1,
  },
};

// Interactive
export const Interactive: StoryFn<typeof Stepper> = (args) => {
  const steps = args.steps ?? baseSteps;
  const [activeIndex, setActiveIndex] = useState(args.activeIndex ?? 0);

  const currentStep = steps[activeIndex];

  const logStepChange = action('step-changed');

  const setStep = (index: number) => {
    const step = steps[index];

    logStepChange({
      index,
      step,
    });

    setActiveIndex(index);
  };

  const goNext = () => {
    setStep(Math.min(activeIndex + 1, steps.length - 1));
  };

  const goPrev = () => {
    setStep(Math.max(activeIndex - 1, 0));
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <Stepper
        {...args}
        steps={steps}
        clickable
        activeIndex={activeIndex}
        onStepChange={setStep}
      />

      {/* CURRENT STEP DISPLAY */}
      <div className="border-t pt-4 text-center">
        <p className="text-xs text-slate-400">Current Step</p>
        <p className="font-semibold">
          {currentStep?.prefix} {currentStep?.label}
        </p>
        {currentStep?.description && (
          <p className="text-sm text-slate-500">{currentStep.description}</p>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-3">
        <Button onClick={goPrev} disabled={activeIndex === 0}>
          Previous
        </Button>
        <Button onClick={goNext} disabled={activeIndex === steps.length - 1}>
          Next Step
        </Button>
        <Button variant="tertiary" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

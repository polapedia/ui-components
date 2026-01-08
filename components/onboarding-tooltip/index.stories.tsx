import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/internal/preview-api";
import OnboardingTooltip from ".";
import Button from "../button";
import { useState } from "react";

const meta: Meta<typeof OnboardingTooltip> = {
  title: "Design System/Feedback/Onboarding Tooltip",
  component: OnboardingTooltip,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        height: "600px",
      },
    },
  },
  args: {
    open: true,
    size: "sm",
    placement: "top",
    title: "Onboarding title goes here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "lg"] },
    placement: { control: "select", options: ["top", "bottom"] },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    onOpenChange: { action: "onOpenChange" },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Render Function Helper
const InteractiveRender: StoryFn<typeof OnboardingTooltip> = (args) => {
  const [{ open }, updateArgs] = useArgs();

  const handleOpenChange = (newOpen: boolean) => {
    updateArgs({ open: newOpen });
    args.onOpenChange?.(newOpen);
  };

  return (
    <div className="h-[500px] flex flex-col items-center justify-center gap-4">
      {!open && (
        <Button onClick={() => handleOpenChange(true)} variant="secondary">
          Re-open Tooltip
        </Button>
      )}

      <OnboardingTooltip
        {...args}
        open={open}
        onOpenChange={handleOpenChange}
        footer={
          <div className="flex gap-2 justify-end">
            <Button
              shape="pill"
              size="sm"
              variant="tertiary"
              className="w-full"
              onClick={() => handleOpenChange(false)}>
              Skip
            </Button>
            <Button
              shape="pill"
              size="sm"
              className="w-full"
              onClick={() => handleOpenChange(false)}>
              Got it!
            </Button>
          </div>
        }>
        <Button onClick={() => handleOpenChange(!open)}>Target Element</Button>
      </OnboardingTooltip>
    </div>
  );
};

const InteractiveOneButtonRender: StoryFn<typeof OnboardingTooltip> = (
  args
) => {
  const [{ open }, updateArgs] = useArgs();

  const handleOpenChange = (newOpen: boolean) => {
    updateArgs({ open: newOpen });
    args.onOpenChange?.(newOpen);
  };

  return (
    <div className="h-[500px] flex flex-col items-center justify-center gap-4">
      {!open && (
        <Button onClick={() => handleOpenChange(true)} variant="secondary">
          Re-open Tooltip
        </Button>
      )}

      <OnboardingTooltip
        {...args}
        open={open}
        onOpenChange={handleOpenChange}
        footer={
          <Button
            shape="pill"
            size="sm"
            className="w-full"
            onClick={() => handleOpenChange(false)}>
            Got it!
          </Button>
        }>
        <Button onClick={() => handleOpenChange(!open)}>Target Element</Button>
      </OnboardingTooltip>
    </div>
  );
};

export const Default: Story = {
  render: InteractiveOneButtonRender,
};

export const Small: Story = {
  args: { size: "sm" },
  render: InteractiveRender,
};

export const Large: Story = {
  args: { size: "lg" },
  render: InteractiveRender,
};

export const BottomPlacement: Story = {
  args: { placement: "bottom" },
  render: InteractiveRender,
};

export const ManualImplementation: StoryFn = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[500px] flex items-center justify-center">
      <OnboardingTooltip
        {...args}
        open={isOpen}
        onOpenChange={setIsOpen}
        footer={
          <Button
            size="sm"
            shape="pill"
            className="w-full"
            onClick={() => setIsOpen(false)}>
            Close
          </Button>
        }>
        <Button onClick={() => setIsOpen(true)}>
          {isOpen ? "Active" : "Click Me"}
        </Button>
      </OnboardingTooltip>
    </div>
  );
};
ManualImplementation.args = {
  open: false,
};

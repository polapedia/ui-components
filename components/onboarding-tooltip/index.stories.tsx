import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
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

export const Primary: Story = {
  render: (args) => (
    <div className="h-[500px] flex items-center justify-center">
      <OnboardingTooltip
        {...args}
        open={true}
        onOpenChange={() => {}}
        footer={
          <div className="flex gap-2 justify-end">
            <Button shape="pill" size="sm" className="w-full">
              Got it!
            </Button>
          </div>
        }
      >
        <Button>Target Element</Button>
      </OnboardingTooltip>
    </div>
  ),
};

const InteractiveRender: StoryFn<typeof OnboardingTooltip> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[500px] flex items-center justify-center relative">
      {!open && (
        <Button
          variant="secondary"
          className="absolute top-4"
          onClick={() => setOpen(true)}
        >
          Re-open Tooltip
        </Button>
      )}

      <OnboardingTooltip
        key={`${args.placement}-${args.size}`}
        {...args}
        open={open}
        onOpenChange={setOpen}
        footer={
          <div className="flex gap-2 justify-end">
            <Button
              shape="pill"
              size="sm"
              variant="tertiary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Skip
            </Button>

            <Button
              shape="pill"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Got it!
            </Button>
          </div>
        }
      >
        <Button onClick={() => setOpen(!open)}>Target Element</Button>
      </OnboardingTooltip>
    </div>
  );
};

export const Default: Story = {
  render: InteractiveRender,
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

export const ManualImplementation: StoryFn<typeof OnboardingTooltip> = (
  args,
) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[500px] flex items-center justify-center">
      <OnboardingTooltip
        key={`${args.placement}-${args.size}`}
        {...args}
        open={open}
        onOpenChange={setOpen}
        footer={
          <Button
            size="sm"
            shape="pill"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        }
      >
        <Button onClick={() => setOpen(true)}>
          {open ? "Active" : "Click Me"}
        </Button>
      </OnboardingTooltip>
    </div>
  );
};

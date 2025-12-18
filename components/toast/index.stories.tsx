import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import Toast from ".";
import Button from "../button"; // sesuaikan path button lo
import CloseIcon from "../icons/CloseIcon";
import CheckmarkIcon from "../icons/CheckmarkIcon";

const rightIcons = {
  None: null,
  Close: <CloseIcon className="w-4 h-4" />,
  Checkmark: <CheckmarkIcon className="w-4 h-4" />,
};

const meta: Meta<typeof Toast> = {
  title: "Design System/Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    message: "Toast message. Your catchy one-line message here.",
    dismissible: false,
    rightIcon: rightIcons.None,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success"],
    },
    message: {
      control: "text",
    },
    dismissible: {
      control: "boolean",
    },
    rightIcon: {
      control: "select",
      options: Object.keys(rightIcons),
      mapping: rightIcons,
    },
    onClose: { action: "closed" },
    onClick: { action: "clicked" },
  },
};

export default meta;

export const Default: StoryFn = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>Show Toast</Button>

      {open && (
        <Toast
          variant="default"
          message="Something went wrong. Please try again."
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export const TriggerErrorToast: StoryFn = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>Show Error Toast</Button>

      {open && (
        <Toast
          variant="error"
          message="Something went wrong. Please try again."
          dismissible
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export const TriggerSuccessToast: StoryFn = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>Show Success Toast</Button>

      {open && (
        <Toast
          variant="success"
          message="Saved successfully!"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { action } from "storybook/actions";
import Modal from ".";
import Button from "../button";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof Modal> = {
  title: "Design System/Feedback/Modal",
  component: Modal,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="py-80 flex items center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    open: true,
    size: "md",
    title: "Tittle Goes Here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    checkboxLabel: "Checkbox label",
    checked: false,
    cancelText: "Cancel",
    confirmText: "Confirm",
    closeOnBackdrop: true,
  },
  argTypes: {
    open: { control: "boolean" },
    size: { control: "radio", options: ["sm", "md", "lg"] },

    title: { control: "text" },
    description: { control: "text" },

    checkboxLabel: { control: "text" },
    checked: { control: "boolean" },

    cancelText: { control: "text" },
    confirmText: { control: "text" },

    closeOnBackdrop: { control: "boolean" },

    onOpenChange: { action: "onOpenChange" },
    onCheckedChange: { action: "onCheckedChange" },
    onCancel: { action: "onCancel" },
    onConfirm: { action: "onConfirm" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [{ open, checked }, updateArgs] = useArgs();

    function handleOpenChange(newOpen: boolean) {
      updateArgs({ open: newOpen });
      args.onOpenChange?.(newOpen);
    }

    function handleCheckedChange(newChecked: boolean) {
      updateArgs({ checked: newChecked });
      args.onCheckedChange?.(newChecked);
    }

    return (
      <>
        {!open && (
          <Button onClick={() => handleOpenChange(true)}>Re-open Modal</Button>
        )}

        <Modal
          {...args}
          open={open}
          checked={checked}
          onOpenChange={handleOpenChange}
          onCheckedChange={handleCheckedChange}
          onCancel={() => {
            handleOpenChange(false);
            args.onCancel?.();
          }}
          onConfirm={() => {
            handleOpenChange(false);
            args.onConfirm?.();
          }}
        />
      </>
    );
  },
};

export const Interactive: StoryFn<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(!!args.checked);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => {
          setOpen(true);
          action("trigger.open")("open");
        }}>
        Open Modal
      </Button>

      <Modal
        {...args}
        open={open}
        checked={checked}
        onOpenChange={(v) => {
          setOpen(v);
          action("onOpenChange")(v);
        }}
        onCheckedChange={(v) => {
          setChecked(v);
          action("onCheckedChange")(v);
        }}
        onCancel={() => action("onCancel")("cancel")}
        onConfirm={() => action("onConfirm")("confirm")}
      />
    </div>
  );
};
Interactive.args = {
  open: false,
};

export const NoDescription: Story = {
  args: {
    description: "",
  },
};

import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import VerificationField, { VerificationFieldProps } from ".";
import { useState } from "react";
import { action } from "storybook/actions";

const meta: Meta<typeof VerificationField> = {
  title: "Design System/Form/Verification Field",
  component: VerificationField,
  parameters: {
    layout: "centered",
  },
  args: {
    length: 4,
    disabled: false,
    autoFocus: false,
    label: "Verification code",
    helperText: "",
    error: false,
  },
  argTypes: {
    length: {
      control: { type: "number", min: 1, max: 8, step: 1 },
      description: "Number of digits",
    },
    disabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    autoFocus: {
      control: "boolean",
      description: "Auto focus the first digit on mount",
    },
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    error: {
      control: "boolean",
      description: "Visual error state",
    },
    value: {
      control: "text",
      description: "Controlled value (e.g. '1234')",
    },
    onChange: { action: "changed" },
    onComplete: { action: "completed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: "Enter the 4-digit code sent to your phone",
  },
};

export const SixDigits: Story = {
  args: {
    length: 6,
    helperText: "6-digit verification code",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "This field is disabled",
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    helperText: "The code you entered is incorrect",
    value: "1234",
  },
};

export const Controlled: StoryFn<VerificationFieldProps> = (args) => {
  const [code, setCode] = useState("1234");

  return (
    <div className="flex flex-col gap-3">
      <VerificationField
        {...args}
        value={code}
        onChange={(val) => {
          setCode(val);
          action("onChange")(val);
        }}
        onComplete={(val) => {
          action("onComplete")(val);
        }}
        helperText={`Current value: ${code || "empty"}`}
      />
    </div>
  );
};

Controlled.args = {
  length: 4,
  label: "Controlled verification code",
};

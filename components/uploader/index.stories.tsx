import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import Uploader from ".";
import { useState } from "react";
import { action } from "storybook/actions";

const meta: Meta<typeof Uploader> = {
  title: "Design System/Form/Uploader",
  component: Uploader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="py-6 px-[240px] bg-white flex items-start justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "compact",
    disabled: false,
    multiple: false,
    helperText: "",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["compact", "dropzone"],
    },
    disabled: {
      control: "boolean",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    onChange: { action: "fileChanged" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-[360px]">
      <Uploader {...args} variant="compact" label="Compact" />
      <Uploader {...args} variant="dropzone" label="Dropzone" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled uploader",
    helperText: "Cannot select file",
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: "Upload multiple files",
    helperText: "You can select multiple files",
  },
};

export const WithLocalPreview: StoryFn<typeof Uploader> = (args) => {
  const [filesInfo, setFilesInfo] = useState<string>("No file yet");

  return (
    <div className="flex flex-col gap-3 w-[360px]">
      <Uploader
        {...args}
        multiple
        label="Uploader with onChange"
        helperText={filesInfo}
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length === 0) {
            setFilesInfo("No file yet");
            return;
          }
          if (files.length === 1) {
            setFilesInfo(`1 file: ${files[0].name}`);
          } else {
            setFilesInfo(`${files.length} selected files`);
          }
          action("onChange")(e);
        }}
      />

      <p className="text-xs text-content-secondary">
        File info will appear in helper text
      </p>
    </div>
  );
};
WithLocalPreview.args = {
  variant: "dropzone",
};

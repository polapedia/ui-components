import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoaderCustom from ".";

const meta: Meta<typeof LoaderCustom> = {
  title: "Design System/Feedback/Loader Custom",
  component: LoaderCustom,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-24">
      <LoaderCustom />
    </div>
  ),
};

export const ContainerSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">w-12</span>
        <div className="w-12 border border-dashed border-neutral-300 p-1">
          <LoaderCustom />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">w-24</span>
        <div className="w-24 border border-dashed border-neutral-300 p-1">
          <LoaderCustom />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">w-48</span>
        <div className="w-48 border border-dashed border-neutral-300 p-1">
          <LoaderCustom />
        </div>
      </div>
    </div>
  ),
};

export const ContextExample: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Processing Data</h3>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-40">
          <LoaderCustom />
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Please wait while we fetch the latest updates...
        </p>
      </div>
    </div>
  ),
};

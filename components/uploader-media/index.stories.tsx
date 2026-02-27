import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UploaderMedia from '.';

const meta: Meta<typeof UploaderMedia> = {
  title: 'Design System/Form/Uploader Media',
  component: UploaderMedia,
  parameters: {
    layout: 'centered',
  },
  args: {
    disabled: false,
    multiple: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story 1: Component Only (Standalone)
export const Default: Story = {
  args: {
    label: 'Choose File',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Choose File',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: 'File too large',
  },
};

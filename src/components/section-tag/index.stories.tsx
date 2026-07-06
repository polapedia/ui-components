import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionTag from '.';

const meta: Meta<typeof SectionTag> = {
  title: 'Design System/Display/SectionTag',
  component: SectionTag,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    variant: 'accent',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the section tag',
    },
    variant: {
      control: 'radio',
      options: ['accent', 'brand'],
      description: 'Visual variant — accent (monochrome) or brand (gradient)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  render: (args) => <SectionTag {...args}>Deskripsi</SectionTag>,
};

// Sizes - Accent
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <SectionTag {...args} size="lg">
        Large (lg)
      </SectionTag>
      <SectionTag {...args} size="md">
        Medium (md)
      </SectionTag>
      <SectionTag {...args} size="sm">
        Small (sm)
      </SectionTag>
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <SectionTag {...args} variant="accent">
        Accent Variant
      </SectionTag>
      <SectionTag {...args} variant="brand">
        Brand Variant
      </SectionTag>
    </div>
  ),
};

// All Sizes × Variants matrix
export const AllSizesAndVariants: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {/* Accent column */}
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold text-gray-500 mb-1">Accent</p>
        <SectionTag {...args} variant="accent" size="lg">
          Deskripsi
        </SectionTag>
        <SectionTag {...args} variant="accent" size="md">
          Deskripsi
        </SectionTag>
        <SectionTag {...args} variant="accent" size="sm">
          Deskripsi
        </SectionTag>
      </div>

      {/* Brand column */}
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold text-gray-500 mb-1">Brand</p>
        <SectionTag {...args} variant="brand" size="lg">
          Deskripsi
        </SectionTag>
        <SectionTag {...args} variant="brand" size="md">
          Deskripsi
        </SectionTag>
        <SectionTag {...args} variant="brand" size="sm">
          Deskripsi
        </SectionTag>
      </div>
    </div>
  ),
};

// Showcase - interactive
export const Showcase: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">Section Tag</h3>
        <p className="text-gray-500 text-sm">
          A small pill label used to provide context before a main heading.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Accent
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SectionTag {...args} variant="accent" size="sm">
              Kategori
            </SectionTag>
            <SectionTag {...args} variant="accent" size="md">
              Kategori
            </SectionTag>
            <SectionTag {...args} variant="accent" size="lg">
              Kategori
            </SectionTag>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Brand
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SectionTag {...args} variant="brand" size="sm">
              Kategori
            </SectionTag>
            <SectionTag {...args} variant="brand" size="md">
              Kategori
            </SectionTag>
            <SectionTag {...args} variant="brand" size="lg">
              Kategori
            </SectionTag>
          </div>
        </div>
      </div>
    </div>
  ),
};

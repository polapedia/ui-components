import type { Meta, StoryObj } from "@storybook/react";
import Accordion from ".";

const dummyItems = [
  {
    id: 1,
    question: "Apa itu Polapedia?",
    answer:
      "Polapedia adalah AI Engineering Marketplace yang memadukan kecerdasan buatan dengan dunia desain teknik. Pengguna bisa membuat, mencari, dan bertransaksi desain 2D/3D lintas bidang (mesin, arsitektur, sipil, otomasi, industri) secara cepat, akurat, dan terintegrasi.",
  },
  {
    id: 2,
    question: "Bagaimana cara menggunakan POLO AI?",
    answer: `1. Unggah gambar/sketsa atau tulis deskripsi.
       2. POLO AI menganalisis bentuk, dimensi, dan fungsi.
       3. Sistem menghasilkan model 2D/3D + BOM, BOQ, dan estimasi RAB.
       4. Unduh/ubah/ekspor ke AutoCAD, Solid Works, Blender, dan lainnya.`,
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Design System/Display/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  args: {
    items: dummyItems,
    allowMultipleOpen: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
    },
    showLine: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    return <Accordion {...args} />;
  },
};

export const WithLine: Story = {
  args: {
    size: "md",
    showLine: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    showLine: false,
  },
};

export const MultipleOpen: Story = {
  args: {
    allowMultipleOpen: true,
  },
};

export const Comparison: Story = {
  render: (args) => (
    <div className="flex flex-col gap-12 bg-gray-100 p-8">
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500">MD (WITHOUT LINE)</h3>
        <Accordion {...args} size="md" showLine={false} />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500">MD (WITH LINE)</h3>
        <Accordion {...args} size="md" showLine={true} />
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-500">SM (WITHOUT LINE)</h3>
          <Accordion {...args} size="sm" showLine={false} />
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-500">SM (WITH LINE)</h3>
          <Accordion {...args} size="sm" showLine={true} />
        </div>
      </div>
    </div>
  ),
};

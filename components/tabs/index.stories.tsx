import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import Tabs, { TabItem } from ".";
import HomeIcon from "../icons/HomeIcon";
import PlusOneIcon from "../icons/PlusOneIcon";

// Mock Data
const defaultItems: TabItem[] = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Profile", value: "profile" },
  { label: "Settings", value: "settings" },
];

const itemsWithIcons: TabItem[] = [
  { label: "Home", value: "home", icon: <HomeIcon /> },
  { label: "Profile", value: "profile", icon: <PlusOneIcon /> },
];

const itemsComplete: TabItem[] = [
  { label: "Overview", value: "overview", icon: <HomeIcon /> },
  { label: "Details", value: "details" },
  { label: "Disabled", value: "disabled", disabled: true },
];

const meta: Meta<typeof Tabs> = {
  title: "Design System/Navigation & Action/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  args: {
    items: defaultItems,
    value: "dashboard",
    variant: "underline",
    size: "md",
    iconPosition: "left",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["underline", "solid"],
      description: "Visual style of the tabs",
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Size of the tab items",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "top"],
      description: "Icon position",
    },
    value: {
      control: "text",
      description: "Current active tab value",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Render function using useArgs to handle controlled state
export const RenderTabs: StoryFn<typeof Tabs> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <Tabs
      {...args}
      value={value}
      onChange={(newValue) => {
        args.onChange?.(newValue);
        updateArgs({ value: newValue });
      }}
    />
  );
};

// Single Tab
export const SingleUnderline: Story = {
  render: RenderTabs,
  args: {
    items: [{ label: "Tab label", value: "single" }],
    value: "single",
    variant: "underline",
  },
};

export const SingleSolid: Story = {
  render: RenderTabs,
  args: {
    items: [{ label: "Tab label", value: "single" }],
    value: "single",
    variant: "solid",
  },
};

// Multiple Tabs
export const Default: Story = {
  render: RenderTabs,
  args: {
    items: defaultItems,
    value: "dashboard",
    variant: "underline",
  },
};

export const WithIconsLeft: Story = {
  render: RenderTabs,
  args: {
    items: itemsWithIcons,
    value: "home",
    variant: "underline",
    iconPosition: "left",
  },
};

export const WithIconsTop: Story = {
  render: RenderTabs,
  args: {
    items: itemsWithIcons,
    value: "home",
    variant: "underline",
    iconPosition: "top",
  },
};

export const SolidBackground: Story = {
  render: RenderTabs,
  args: {
    variant: "solid",
    items: itemsComplete,
    value: "overview",
    iconPosition: "left",
  },
};

export const SolidWithIconsLeft: Story = {
  render: RenderTabs,
  args: {
    variant: "solid",
    items: [
      { label: "Home", value: "1", icon: <HomeIcon /> },
      { label: "User", value: "2", icon: <PlusOneIcon /> },
      { label: "Settings", value: "3" },
    ],
    value: "1",
    iconPosition: "left",
  },
};

export const SolidWithIconsTop: Story = {
  render: RenderTabs,
  args: {
    variant: "solid",
    items: [
      { label: "Home", value: "1", icon: <HomeIcon /> },
      { label: "User", value: "2", icon: <PlusOneIcon /> },
      { label: "Settings", value: "3" },
    ],
    value: "1",
    iconPosition: "top",
  },
};

// Sizes showcase
export const Sizes: StoryFn<typeof Tabs> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  const handleChange = (newValue: string) => {
    args.onChange?.(newValue);
    updateArgs({ value: newValue });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm text-gray-500">Small (sm)</h3>
        <Tabs
          {...args}
          size="sm"
          value={value}
          onChange={handleChange}
          items={itemsComplete}
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm text-gray-500">Medium (m)</h3>
        <Tabs
          {...args}
          size="md"
          value={value}
          onChange={handleChange}
          items={itemsComplete}
        />
      </div>
    </div>
  );
};
Sizes.args = {
  value: "overview",
};

// Responsive with horizontal scroll
export const ResponsiveScroll: StoryFn<typeof Tabs> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <div className="w-[320px] border border-dashed border-gray-200 p-2">
      <Tabs
        {...args}
        value={value}
        onChange={(val) => updateArgs({ value: val })}
      />
      <p className="mt-2 text-xs text-gray-400">
        Container constrained to 320px. Try scrolling horizontally.
      </p>
    </div>
  );
};
ResponsiveScroll.args = {
  items: [
    ...defaultItems,
    { label: "Analytics", value: "analytics" },
    { label: "Reports", value: "reports" },
    { label: "History", value: "history" },
  ],
  value: "dashboard",
  variant: "underline",
  iconPosition: "left",
};

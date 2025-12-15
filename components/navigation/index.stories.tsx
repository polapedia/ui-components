import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navigation, { NavItem } from ".";
import { action } from "storybook/actions";

const defaultItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Polo AI", href: "/polo-ai" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Terms Of Service", href: "/tos" },
];

const meta: Meta<typeof Navigation> = {
  title: "Design System/Navigation & Action/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: defaultItems,
    activeHref: "/",
    sticky: false,
    variant: "elevated",
    contactLabel: "Contact",
    hideContactButton: false,
    onContactClick: action("contact click"),
  },
  argTypes: {
    items: {
      control: "object",
      description: "List of navigation items.",
    },
    className: {
      control: "text",
      description: "Additional custom className for the root element.",
    },
    activeHref: {
      control: "text",
      description: "The href of the currently active route.",
    },
    variant: {
      control: "radio",
      options: ["elevated", "flat"],
      description: "Visual style of the navigation container.",
    },
    sticky: {
      control: "boolean",
      description: "Makes the navigation sticky at the top when enabled.",
    },
    contactLabel: {
      control: "text",
      description: "Text label for the Contact button.",
    },
    hideContactButton: {
      control: "boolean",
      description: "Hide the Contact button when set to true.",
    },
    logo: {
      control: false,
      table: {
        type: { summary: "ReactNode" },
      },
      description: "Custom logo node to replace the default Polapedia logo.",
    },
    onContactClick: {
      action: "contact clicked",
      table: { category: "Events" },
      description:
        "Callback fired when the Contact button is clicked. Ideal place to trigger router.push('/contact').",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    className: "px-4",
  },
};

export const WithActiveItem: Story = {
  args: {
    className: "px-4",
    activeHref: "/marketplace",
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
};

export const Tab: Story = {
  globals: { viewport: { value: "tab", isRotated: false } },
};

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
};

export const WithDisabledItem: Story = {
  args: {
    className: "px-4",
    items: [
      ...defaultItems.slice(0, 3),
      { label: "Marketplace", href: "/marketplace", disabled: true },
      ...defaultItems.slice(4),
    ],
    activeHref: "/",
  },
};

export const Sticky: Story = {
  args: {
    className: "px-4",
    sticky: true,
  },
};

export const StatesShowcase: Story = {
  args: {
    className: "px-4",
    items: [
      { label: "Home (Active)", href: "/", disabled: false },
      { label: "Disabled Link", href: "/disabled", disabled: true },
      { label: "Regular Link", href: "/regular" },
    ],
    activeHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use your mouse to see **hover** and **active/pressed** states. Press `Tab` a few times to observe **focus** states on links and the Contact button.",
      },
    },
  },
};

import type { MouseEvent } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import Navigation from '.';
import type { NavigationProps, NavItem, SidebarItem } from './types';
import { HomeIcon } from '@/lib';
import DocumentationIcon from '../icons/DocumentationIcon';
import PaymentIcon from '../icons/PaymentIcon';
import UserIcon from '../icons/UserIcon';
import BurshIcon from '../icons/BurshIcon';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Polo AI', href: '/polo-ai' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Terms Of Service', href: '/tos' },
];

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
  {
    id: 'transaction',
    label: 'Daftar Transaksi',
    icon: <DocumentationIcon />,
  },
  {
    id: 'payment',
    label: 'Pembayaran',
    icon: <PaymentIcon />,
  },
  {
    id: 'settings',
    label: 'Pengaturan Akun',
    icon: <UserIcon />,
  },
];

const sidebarBottomItems: SidebarItem[] = [
  { id: 'creator', label: 'Daftar Menjadi Creator', icon: <BurshIcon /> },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const defaultDecorator: Decorator = (Story) => (
  <div className="min-h-screen bg-neutral-200 flex justify-center items-start pt-4 px-4">
    <Story />
  </div>
);

const stickyDecorator: Decorator = (Story) => (
  <div className="w-full">
    <Story />
    <div className="h-screen flex items-center justify-center text-neutral-400 text-sm select-none">
      ↑ scroll up to see the nav stay pinned
    </div>
  </div>
);

const marketplaceDecorator: Decorator = (Story) => (
  <div className="min-h-screen bg-white w-full">
    <Story />
    <div className="h-screen flex items-center justify-center text-neutral-400 text-sm select-none">
      ↑ scroll up to see sticky behaviour
    </div>
  </div>
);

const meta: Meta<typeof Navigation> = {
  title: 'Design System/Navigation & Action/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    viewport: { options: MINIMAL_VIEWPORTS },
    docs: {
      description: {
        component:
          'Global navigation component supporting two variants: `default` for the company-profile / landing page, and `marketplace` for the marketplace app.',
      },
    },
  },
  decorators: [defaultDecorator],
  argTypes: {
    // ── Shared ──────────────────────────────────────────────────────────────
    variant: {
      control: 'radio',
      options: ['default', 'marketplace'],
      description: 'Selects which navigation layout to render.',
      table: { defaultValue: { summary: 'default' } },
    },
    sticky: {
      control: 'boolean',
      description:
        'Pins the nav to the top of the viewport while scrolling. Defaults to `false` for `default`, `true` for `marketplace`.',
      table: { type: { summary: 'boolean' } },
    },
    logo: {
      control: false,
      description: 'Custom logo node. Defaults to the Polapedia logo.',
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Extra class names applied to the root element.',
    },

    // ── Default variant ──────────────────────────────────────────────────────
    items: {
      control: 'object',
      description: '`default` — Array of navigation links shown in the menu.',
      table: {
        category: 'Default variant',
        type: { summary: 'NavItem[]' },
      },
    },
    activeHref: {
      control: 'text',
      description:
        '`default` — The `href` of the currently active route. Falls back to the current pathname when omitted.',
      table: {
        category: 'Default variant',
        defaultValue: { summary: 'pathname' },
      },
    },
    visualVariant: {
      control: 'radio',
      options: ['elevated', 'flat'],
      description:
        '`default` — `elevated` adds a drop shadow; `flat` uses a border only. Either way, scrolling past 20 px activates the elevated shadow.',
      table: {
        category: 'Default variant',
        defaultValue: { summary: 'elevated' },
      },
    },
    contactLabel: {
      control: 'text',
      description: '`default` — Label displayed inside the Contact CTA button.',
      table: {
        category: 'Default variant',
        defaultValue: { summary: 'Contact' },
      },
    },
    hideContactButton: {
      control: 'boolean',
      description: '`default` — Hides the Contact button when `true`.',
      table: {
        category: 'Default variant',
        defaultValue: { summary: 'false' },
      },
    },
    onContactClick: {
      description: '`default` — Fired when the Contact button is clicked.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onClick: {
      description:
        '`default` — Fired when any nav link is clicked (before navigation).',
      table: {
        category: 'Events',
        type: { summary: 'MouseEventHandler<HTMLElement>' },
      },
    },

    // ── Marketplace variant ──────────────────────────────────────────────────
    searchQuery: {
      control: 'text',
      description:
        '`marketplace` — Controlled search value. Omit to let the component manage its own internal state.',
      table: {
        category: 'Marketplace variant',
        type: { summary: 'string' },
      },
    },
    creatorLabel: {
      control: 'text',
      description:
        '`marketplace` — Label for the "Jadi Creator/Supplier" link.',
      table: {
        category: 'Marketplace variant',
        defaultValue: { summary: 'Jadi Creator/Supplier' },
      },
    },
    creatorHref: {
      control: 'text',
      description: '`marketplace` — href for the creator link.',
      table: {
        category: 'Marketplace variant',
        defaultValue: { summary: '#' },
      },
    },
    sidebarItems: {
      control: 'object',
      description: '`marketplace` — Items rendered inside the sidebar menu.',
      table: {
        category: 'Marketplace variant',
        type: { summary: 'SidebarItem[]' },
      },
    },
    sidebarBottomItems: {
      control: 'object',
      description: '`marketplace` — Items pinned to the bottom of the sidebar.',
      table: {
        category: 'Marketplace variant',
        type: { summary: 'SidebarItem[]' },
      },
    },
    onSearchChange: {
      description:
        '`marketplace` — Fired on every keystroke with the current query string.',
      table: {
        category: 'Events',
        type: { summary: '(query: string) => void' },
      },
    },
    onSearchSubmit: {
      description:
        '`marketplace` — Fired with the trimmed query when the user presses Enter.',
      table: {
        category: 'Events',
        type: { summary: '(query: string) => void' },
      },
    },
    onSearchFocus: {
      description: '`marketplace` — Fired when the search input receives focus.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onSearchClickOutside: {
      description:
        '`marketplace` — Fired when users click outside the search container or close search interactions.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    searchDropdown: {
      control: false,
      description:
        '`marketplace` — Custom dropdown content rendered inside the search container.',
      table: {
        category: 'Marketplace variant',
        type: { summary: 'ReactNode' },
      },
    },
    onCategoryMouseEnter: {
      description: '`marketplace` — Fired when the category label is hovered.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onCategoryMouseLeave: {
      description: '`marketplace` — Fired when the category label hover ends.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onCameraClick: {
      description:
        '`marketplace` — Fired when the camera icon inside the search bar is clicked.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onMessageClick: {
      description:
        '`marketplace` — Fired when the message icon in TopNavbar is clicked.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onNotificationClick: {
      description:
        '`marketplace` — Fired when the notification bell is clicked.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onCartClick: {
      description: '`marketplace` — Fired when the cart icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<NavigationProps>;

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT VARIANT
// ─────────────────────────────────────────────────────────────────────────────

/** Interactive sandbox for the default nav — tweak any prop in the Controls panel. */
export const Playground: Story = {
  args: {
    variant: 'default',
    items: defaultItems,
    activeHref: '/',
    onClick: (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      action('item-click')(e);
    },
    sticky: false,
    visualVariant: 'elevated',
    contactLabel: 'Contact',
    hideContactButton: false,
    onContactClick: action('contact-click'),
    className: 'px-4',
  },
};

/** Active state applied to the Marketplace link. */
export const WithActiveItem: Story = {
  name: 'With Active Item',
  args: {
    ...Playground.args,
    activeHref: '/marketplace',
  },
};

/** One link is disabled and cannot be clicked. */
export const WithDisabledItem: Story = {
  name: 'With Disabled Item',
  args: {
    ...Playground.args,
    items: [
      ...defaultItems.slice(0, 3),
      { label: 'Marketplace', href: '/marketplace', disabled: true },
      ...defaultItems.slice(4),
    ],
  },
};

/** Contact button is hidden — useful on the Contact page itself. */
export const HiddenContactButton: Story = {
  name: 'Hidden Contact Button',
  args: {
    ...Playground.args,
    hideContactButton: true,
  },
};

/**
 * Nav stays fixed at the top while the page scrolls.
 */
export const Sticky: Story = {
  args: {
    ...Playground.args,
    sticky: true,
  },
  decorators: [stickyDecorator],
};

/**
 * `flat` drops the shadow and uses a border only.
 * Best suited for white or minimal backgrounds.
 */
export const FlatVisualVariant: Story = {
  name: 'Visual Variant: Flat',
  args: {
    ...Playground.args,
    visualVariant: 'flat',
  },
};

/**
 * All interactive states side-by-side.
 * Hover and click the links, then press Tab to inspect focus styles.
 */
export const StatesShowcase: Story = {
  name: 'States Showcase',
  args: {
    ...Playground.args,
    items: [
      { label: 'Home (Active)', href: '/' },
      { label: 'Regular Link', href: '/regular' },
      { label: 'Disabled Link', href: '/disabled', disabled: true },
    ],
    activeHref: '/',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover and click links to test **hover** and **pressed** states. Press `Tab` to cycle through **focus** styles. The first link demonstrates the **active** gradient.',
      },
    },
  },
};

/** Mobile viewport — hamburger menu replaces the link row. */
export const DefaultMobile: Story = {
  name: 'Default / Mobile',
  args: { ...Playground.args },
  globals: { viewport: { value: 'mobile2', isRotated: false } },
};

/** Tablet viewport. */
export const DefaultTablet: Story = {
  name: 'Default / Tablet',
  args: { ...Playground.args },
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

/** Full desktop viewport. */
export const DefaultDesktop: Story = {
  name: 'Default / Desktop',
  args: { ...Playground.args },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

// ─────────────────────────────────────────────────────────────────────────────
// MARKETPLACE VARIANT
// ─────────────────────────────────────────────────────────────────────────────

const marketplaceBase = {
  variant: 'marketplace' as const,
  sticky: true,
  creatorLabel: 'Jadi Creator/Supplier',
  creatorHref: '#',
  sidebarItems,
  sidebarBottomItems,
  onSearchChange: action('search-change'),
  onSearchSubmit: action('search-submit'),
  onSearchFocus: action('search-focus'),
  onSearchClickOutside: action('search-click-outside'),
  onCategoryMouseEnter: action('category-mouse-enter'),
  onCategoryMouseLeave: action('category-mouse-leave'),
  onCameraClick: action('camera-click'),
  onMessageClick: action('message-click'),
  onNotificationClick: action('notification-click'),
  onCartClick: action('cart-click'),
  className: 'px-8',
};

/** Interactive sandbox for the marketplace nav. */
export const MarketplacePlayground: Story = {
  name: 'Marketplace / Playground',
  args: marketplaceBase,
  decorators: [marketplaceDecorator],
};

/**
 * Controlled search mode: `searchQuery` is driven from outside.
 * The search bar reflects whatever value is set in the Controls panel.
 */
export const MarketplaceControlledSearch: Story = {
  name: 'Marketplace / Controlled Search',
  args: { ...marketplaceBase, searchQuery: 'batik tulis' },
  decorators: MarketplacePlayground.decorators,
  parameters: {
    docs: {
      description: {
        story:
          'Pass `searchQuery` + `onSearchChange` to take full control of the input value. Useful when the parent manages routing or debounce logic.',
      },
    },
  },
};

/** Custom dropdown content rendered below the search bar. */
export const MarketplaceSearchDropdown: Story = {
  name: 'Marketplace / Search Dropdown',
  args: {
    ...marketplaceBase,
    searchQuery: 'batik',
    searchDropdown: (
      <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg">
        <p className="mb-2 text-sm font-semibold text-neutral-900">Suggestions</p>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li>Batik tulis premium</li>
          <li>Batik cap Pekalongan</li>
          <li>Kain batik modern</li>
        </ul>
      </div>
    ),
  },
  decorators: MarketplacePlayground.decorators,
};

/** Category dropdown can be composed as children below the marketplace header. */
export const MarketplaceCategoryDropdown: Story = {
  name: 'Marketplace / Category Dropdown',
  args: {
    ...marketplaceBase,
    children: (
      <div className="absolute left-0 top-full z-40 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg">
        <p className="mb-3 text-sm font-semibold text-neutral-900">Kategori</p>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li>Fashion</li>
          <li>Kerajinan</li>
          <li>Makanan & Minuman</li>
        </ul>
      </div>
    ),
  },
  decorators: MarketplacePlayground.decorators,
};

/** `sticky={false}` — scrolls away with the page. */
export const MarketplaceNonSticky: Story = {
  name: 'Marketplace / Non-Sticky',
  args: { ...marketplaceBase, sticky: false },
  decorators: MarketplacePlayground.decorators,
};

/** Mobile viewport. */
export const MarketplaceMobile: Story = {
  name: 'Marketplace / Mobile',
  args: marketplaceBase,
  decorators: MarketplacePlayground.decorators,
  globals: { viewport: { value: 'mobile2', isRotated: false } },
};

/** Tablet viewport. */
export const MarketplaceTablet: Story = {
  name: 'Marketplace / Tablet',
  args: marketplaceBase,
  decorators: MarketplacePlayground.decorators,
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

/** Full desktop viewport. */
export const MarketplaceDesktop: Story = {
  name: 'Marketplace / Desktop',
  args: marketplaceBase,
  decorators: MarketplacePlayground.decorators,
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

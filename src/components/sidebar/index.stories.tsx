import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import Sidebar from './index';
import type { SidebarItem, SidebarGroup, SidebarMenuItem } from './types';
import HomeIcon from '@/components/icons/HomeIcon';
import DocumentationIcon from '@/components/icons/DocumentationIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import UserIcon from '@/components/icons/UserIcon';
import BurshIcon from '@/components/icons/BurshIcon';
import PaymentIcon from '@/components/icons/PaymentIcon';
import HamburgerIcon from '@/components/icons/HamburgerIcon';

// Shared fixtures
const flatItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    isActive: true,
    href: '/dashboard',
    icon: <HomeIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Dashboard');
    },
  },
  {
    label: 'Daftar Transaksi',
    href: '/transactions',

    icon: <DocumentationIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Daftar Transaksi');
    },
  },
  {
    label: 'Pembayaran',
    href: '/payments',
    icon: <PaymentIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Pembayaran');
    },
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
    icon: <HeartIcon className="" />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Wishlist');
    },
  },
  {
    label: 'Pengaturan Akun',
    href: '/settings',
    icon: <UserIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Pengaturan Akun');
    },
  },
];

const menuItems: SidebarMenuItem[] = flatItems.map((item, i) => ({
  ...item,
  id: `item-${i}`,
}));

const sellerGroups: SidebarGroup[] = [
  {
    heading: 'Primary',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
      { label: 'Order', href: '/orders', icon: <DocumentationIcon /> },
      { label: 'Produk', href: '/products', icon: <PaymentIcon /> },
      { label: 'Inventory', href: '/inventory', icon: <DocumentationIcon /> },
    ],
  },
  {
    heading: 'Toko',
    items: [
      { label: 'Customer', href: '/customers', icon: <UserIcon /> },
      { label: 'Analytics', href: '/analytics', icon: <DocumentationIcon /> },
      {
        label: 'Marketing',
        href: '/marketing',
        icon: <HeartIcon />,
      },
    ],
  },
  {
    heading: 'Growth',
    items: [
      { label: 'Keuangan', href: '/finance', icon: <PaymentIcon /> },
      { label: 'Settings', href: '/settings', icon: <UserIcon /> },
    ],
  },
];

const bottomItems: SidebarMenuItem[] = [
  {
    id: 'b1',
    label: 'Daftar Menjadi Creator',
    href: '/creator',
    icon: <BurshIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Daftar Menjadi Creator');
    },
  },
  {
    id: 'b2',
    label: 'Pusat Bantuan',
    href: '/help',
    icon: <DocumentationIcon />,
    onClick: (e) => {
      e?.preventDefault?.();
      action('click')('Pusat Bantuan');
    },
  },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Navigation & Action/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar component with three main variants: `overlay`, `hover`, and `collapsible`. Supports sizing (`sm`, `md`, `lg`) and responsiveness.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Overlay variant
export const OverlayVariant: Story = {
  name: 'Overlay (Mobile/Generic)',
  args: {
    variant: 'overlay',
    items: menuItems,
    trigger: <HamburgerIcon className="w-6 h-6" />,
    title: 'Polapedia',
    panelClassName: 'text-[18px]',
    size: 'md',
    bottomItems: bottomItems,
  },
  render: (args) => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Sidebar {...args} />
      <p className="text-sm text-gray-500 mt-4">
        Click the hamburger icon at the top left to open the sidebar.
      </p>
    </div>
  ),
};

export const OverlaySizes: Story = {
  name: 'Overlay - Sizing',
  render: () => (
    <div className="p-6 flex gap-4 bg-gray-50 min-h-screen">
      <Sidebar
        variant="overlay"
        items={menuItems}
        bottomItems={bottomItems}
        trigger={
          <button className="px-4 py-2 bg-white border rounded-lg">
            Open SM
          </button>
        }
        size="sm"
        title="Small Sidebar"
      />
      <Sidebar
        variant="overlay"
        items={menuItems}
        bottomItems={bottomItems}
        trigger={
          <button className="px-4 py-2 bg-white border rounded-lg">
            Open MD
          </button>
        }
        size="md"
        title="Medium Sidebar"
      />
      <Sidebar
        variant="overlay"
        items={menuItems}
        bottomItems={bottomItems}
        trigger={
          <button className="px-4 py-2 bg-white border rounded-lg">
            Open LG
          </button>
        }
        size="lg"
        title="Large Sidebar"
      />
    </div>
  ),
};

// Hover variant
export const HoverVariant: Story = {
  name: 'Hover (User Dashboard)',
  args: {
    size: 'md',
  },
  render: function Render(args) {
    const [activeHref, setActiveHref] = React.useState('/dashboard');

    const items = flatItems.map((item) => ({
      ...item,
      onClick: (e?: React.MouseEvent) => {
        e?.preventDefault();
        setActiveHref(item.href!);
        action('click')(item.label);
      },
    }));

    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          {...args}
          variant="hover"
          items={items}
          bottomItems={bottomItems}
          activeHref={activeHref}
        />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Hover the sidebar on the left to expand. Size:{' '}
            <code>{args.size}</code>
          </p>
        </main>
      </div>
    );
  },
};

export const CollapsibleWithCustomLogo: Story = {
  name: 'Collapsible - Custom Logo',
  args: {
    size: 'md',
    className: 'text-base',
    logo: (
      <div className="flex items-center gap-2">
        <img src="/logo/polapedia.webp" alt="Polapedia" className="w-full" />
      </div>
    ),
    bottomItems: bottomItems,
  },
  render: (args) => {
    // Prevent navigation for demo purposes
    const nonNavigatingGroups = sellerGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onClick: (e?: React.MouseEvent) => {
          e?.preventDefault();
          action('click')(item.label);
        },
      })),
    }));

    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          {...args}
          variant="collapsible"
          groups={nonNavigatingGroups}
          activeHref="/orders"
        />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Custom Logo Example</h1>
          <p className="text-gray-500 text-sm">
            This sidebar uses a custom React node as its logo. Navigation is
            disabled in this story.
          </p>
        </main>
      </div>
    );
  },
};

// Collapsible variant
export const CollapsibleVariant: Story = {
  name: 'Collapsible (Seller Dashboard)',
  args: {
    size: 'md',
    panelClassName: 'text-[18px]',
    bottomItems: bottomItems,
  },
  render: function Render(args) {
    const [activeHref, setActiveHref] = React.useState('/orders');
    const [open, setOpen] = React.useState(true);

    const groups = sellerGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onClick: (e?: React.MouseEvent) => {
          e?.preventDefault();
          setActiveHref(item.href!);
          action('click')(item.label);
        },
      })),
    }));

    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          {...args}
          variant="collapsible"
          groups={groups}
          activeHref={activeHref}
          open={open}
          onOpenChange={setOpen}
        />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Click the toggle icon in the sidebar header to collapse/expand.
          </p>
        </main>
      </div>
    );
  },
};

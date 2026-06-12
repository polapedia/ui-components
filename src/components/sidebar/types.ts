import type { ReactNode } from 'react';

export type SidebarVariant = 'overlay' | 'hover' | 'collapsible';
export type SidebarSize = 'sm' | 'md' | 'lg';

// Base Item Types
export type SidebarItem = {
  id?: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
};

export type SidebarChildItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

export type SidebarMenuItem = SidebarItem & {
  id: string;
  children?: SidebarChildItem[];
};

export type SidebarGroup = {
  /** Section heading label, e.g. "Primary", "Toko", "Growth" */
  heading?: string;
  items: SidebarItem[];
};

// Overlay Variant Props
export type OverlaySidebarProps = {
  variant: 'overlay';
  size?: SidebarSize;
  items: SidebarMenuItem[];
  bottomItems?: SidebarMenuItem[];
  trigger?: ReactNode;
  title?: string;
  className?: string;
  panelClassName?: string;
  defaultOpen?: boolean;
  defaultExpandedIds?: string[];
};

// Hover Variant Props
export type HoverSidebarProps = {
  variant: 'hover';
  size?: SidebarSize;
  items: SidebarItem[];
  bottomItems?: SidebarItem[];
  activeHref?: string;
  className?: string;
  panelClassName?: string;
};

// Collapsible Variant Props
export type CollapsibleSidebarProps = {
  variant: 'collapsible';
  size?: SidebarSize;
  groups: SidebarGroup[];
  bottomItems?: SidebarItem[];
  activeHref?: string;
  /** Logo to display in the header when expanded */
  logo?: ReactNode;
  /** Logo to display in the header when collapsed. If not provided, falls back to the icon part of the default logo or the `logo` prop. */
  collapsedLogo?: ReactNode;
  /** Controlled: open state */
  open?: boolean;
  /** Controlled: callback when toggle is clicked */
  onOpenChange?: (open: boolean) => void;
  /** Uncontrolled default */
  defaultOpen?: boolean;
  className?: string;
  panelClassName?: string;
};

export type SidebarProps =
  | OverlaySidebarProps
  | HoverSidebarProps
  | CollapsibleSidebarProps;

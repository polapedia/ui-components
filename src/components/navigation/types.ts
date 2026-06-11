import type { ComponentProps, ReactNode } from 'react';

// Shared
export type NavVariant = 'default' | 'marketplace';

// Default variant
export type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

type DefaultVisualVariant = 'elevated' | 'flat';

export interface DefaultNavigationProps extends ComponentProps<'nav'> {
  variant?: 'default';
  items: NavItem[];
  activeHref?: string;
  logo?: ReactNode;
  contactLabel?: string;
  onContactClick?: () => void;
  hideContactButton?: boolean;
  sticky?: boolean;
  visualVariant?: DefaultVisualVariant;
  children?: ReactNode;
}

// Marketplace variant
export interface MarketplaceNavigationProps {
  variant: 'marketplace';
  /** Override the logo. Defaults to Polapedia logo. */
  logo?: ReactNode;
  /** Callback fired when the search query changes. */
  onSearchChange?: (_query: string) => void;
  /** Callback fired when the search input is focused. */
  onSearchFocus?: () => void;
  /** Callback fired when clicking outside the search container. */
  onSearchClickOutside?: () => void;
  /** Custom search dropdown rendered inside the search container. */
  searchDropdown?: ReactNode;
  /** Controlled search query value. */
  searchQuery?: string;
  onCategoryMouseEnter: () => void;
  onCategoryMouseLeave: () => void;
  /** Callback fired when the user submits a search (Enter key). */
  onSearchSubmit?: (_query: string) => void;
  /** Callback fired when the camera icon is clicked. */
  onCameraClick?: () => void;
  /** Label for the "Jadi Creator/Supplier" link. */
  creatorLabel?: string;
  /** href for the "Jadi Creator/Supplier" link. */
  creatorHref?: string;
  /** Sidebar menu items for the hamburger menu. */
  sidebarItems?: SidebarItem[];
  /** Bottom items for the sidebar. */
  sidebarBottomItems?: SidebarItem[];
  /** Callback for message icon click. */
  onMessageClick?: () => void;
  /** Callback for notification icon click. */
  onNotificationClick?: () => void;
  /** Callback for cart icon click. */
  onCartClick?: () => void;
  /** Additional className for the root wrapper. */
  className?: string;
  sticky?: boolean;
  children?: ReactNode;
}

export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: Omit<SidebarItem, 'children' | 'icon'>[];
};

// Union prop type
export type NavigationProps =
  | DefaultNavigationProps
  | MarketplaceNavigationProps;

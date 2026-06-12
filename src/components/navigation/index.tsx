import type { NavigationProps } from './types';
import DefaultNavigation from './variants/DefaultNavigation';
import MarketplaceNavigation from './variants/MarketplaceNavigation';

export type { NavItem, NavigationProps, SidebarItem } from './types';

/**
 * Navigation component - renders the correct variant based on the `variant` prop.
 *
 * - `variant="default"` (default) → Company-profile / landing page navigation.
 *   Logo + nav links + Contact button. Responsive with mobile hamburger drawer.
 *
 * - `variant="marketplace"` = Full marketplace navigation.
 *   TopNavbar (logo, sidebar menu, icons) + Header (category, search bar, creator link).
 */
export default function Navigation(props: Readonly<NavigationProps>) {
  if (props.variant === 'marketplace') {
    return <MarketplaceNavigation {...props} />;
  }

  return <DefaultNavigation {...props} />;
}

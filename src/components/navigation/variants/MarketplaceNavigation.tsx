import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import SearchBar from '../../search-bar';
import {
  creatorLinkStyles,
  headerStyles,
  iconsContainerStyles,
  kategoriStyles,
  rootStyles,
  searchBarOverrideStyles,
  searchContainerStyles,
  topNavbarStyles,
} from '../styles/marketplace';
import type { MarketplaceNavigationProps } from '../types';
import MenuIcon from '@/components/icons/MenuIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import NotificationIcon from '@/components/icons/NotificationIcon';
import CartIcon from '@/components/icons/CartIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import Sidebar from '@/components/sidebar';
import CameraIcon from '@/components/icons/CameraIcon';

// Internal sub-components
type TopNavbarProps = Pick<
  MarketplaceNavigationProps,
  | 'logo'
  | 'sidebarItems'
  | 'sidebarBottomItems'
  | 'onMessageClick'
  | 'onNotificationClick'
  | 'onCartClick'
>;

function TopNavbar({
  logo,
  sidebarItems = [],
  sidebarBottomItems = [],
  onMessageClick,
  onNotificationClick,
  onCartClick,
}: TopNavbarProps) {
  return (
    <section id="navbar" className={topNavbarStyles}>
      <Sidebar
        variant="overlay"
        items={sidebarItems}
        bottomItems={sidebarBottomItems}
        trigger={<MenuIcon className="-ml-4" />}
        className="w-10 h-10"
        panelClassName="max-w-[628px] h-full font-exo2 z-50"
      />

      <a
        href="/"
        id="logo"
        aria-label="Go to homepage"
        className="cursor-pointer"
      >
        {logo ?? <img src="/logo/logo.webp" alt="Polapedia homepage" />}
      </a>

      <div id="icons" className={iconsContainerStyles}>
        <button
          type="button"
          aria-label="Messages"
          onClick={onMessageClick}
          className="focus:outline-none"
        >
          <MessageIcon />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          onClick={onNotificationClick}
          className="focus:outline-none"
        >
          <NotificationIcon />
        </button>
        <button
          type="button"
          aria-label="Cart"
          onClick={onCartClick}
          className="focus:outline-none"
        >
          <CartIcon className="text-black" />
        </button>
      </div>
    </section>
  );
}

// Search suggestion types
export type SearchSuggestion = {
  id: string;
  label: string;
};

type HeaderProps = Pick<
  MarketplaceNavigationProps,
  | 'searchQuery'
  | 'onSearchChange'
  | 'onSearchSubmit'
  | 'onSearchFocus'
  | 'onSearchClickOutside'
  | 'searchDropdown'
  | 'onCameraClick'
  | 'creatorLabel'
  | 'creatorHref'
  | 'onCategoryMouseEnter'
  | 'onCategoryMouseLeave'
>;

function Header({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSearchFocus,
  onSearchClickOutside,
  searchDropdown,
  onCameraClick,
  creatorLabel = 'Jadi Creator/Supplier',
  creatorHref = '#',
  onCategoryMouseEnter,
  onCategoryMouseLeave,
}: HeaderProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const query = searchQuery ?? internalQuery;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onSearchClickOutside?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onSearchClickOutside]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInternalQuery(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && query.trim()) {
        onSearchClickOutside?.();
        onSearchSubmit?.(query.trim());
      }
      if (e.key === 'Escape') {
        onSearchClickOutside?.();
      }
    },
    [query, onSearchSubmit, onSearchClickOutside]
  );

  return (
    <section id="header" className={headerStyles}>
      <h3
        onMouseEnter={onCategoryMouseEnter}
        onMouseLeave={onCategoryMouseLeave}
        className={kategoriStyles}
      >
        Kategori
      </h3>

      <div ref={containerRef} className={searchContainerStyles}>
        <SearchBar
          containerClassName={searchBarOverrideStyles}
          placeholder="Search here"
          size="md"
          value={query}
          onChange={handleInputChange}
          onFocus={onSearchFocus}
          onKeyDown={handleKeyDown}
          leftIcon={{ icon: <SearchIcon />, ariaLabel: 'Search' }}
          rightIcon={{
            icon: <CameraIcon />,
            ariaLabel: 'Open camera',
            onClick: onCameraClick,
          }}
        />
        {searchDropdown}
      </div>

      <a className={creatorLinkStyles} href={creatorHref}>
        {creatorLabel}
      </a>
    </section>
  );
}

// MarketplaceNavigation (main export)
export default function MarketplaceNavigation(
  props: Readonly<MarketplaceNavigationProps>
) {
  const {
    logo,
    searchQuery,
    onSearchChange,
    onSearchSubmit,
    onSearchFocus,
    onSearchClickOutside,
    searchDropdown,
    onCameraClick,
    creatorLabel,
    creatorHref,
    sidebarItems,
    sidebarBottomItems,
    onMessageClick,
    onNotificationClick,
    onCartClick,
    onCategoryMouseEnter,
    onCategoryMouseLeave,
    className,
    sticky = true,
    children,
  } = props;

  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div className={rootStyles(sticky, className)}>
      <div className="pt-8">
        <TopNavbar
          logo={logo}
          sidebarItems={sidebarItems}
          sidebarBottomItems={sidebarBottomItems}
          onMessageClick={onMessageClick}
          onNotificationClick={onNotificationClick}
          onCartClick={onCartClick}
        />
      </div>

      <nav ref={navRef} className="relative z-30 mt-3">
        <div className="relative">
          <Header
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            onSearchFocus={onSearchFocus}
            onSearchClickOutside={onSearchClickOutside}
            searchDropdown={searchDropdown}
            onCameraClick={onCameraClick}
            creatorLabel={creatorLabel}
            creatorHref={creatorHref}
            onCategoryMouseEnter={onCategoryMouseEnter}
            onCategoryMouseLeave={onCategoryMouseLeave}
          />
          {children}
        </div>
      </nav>

      <div className="pb-8" />
    </div>
  );
}

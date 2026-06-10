'use client';

import { useEffect, useState } from 'react';
import Button from '../../button';
import {
  closeIconStyles,
  containerStyles,
  hamburgerIconStyles,
  mobileDrawerStyles,
  navItemStyles,
  navStyles,
} from '../styles/default';
import type { DefaultNavigationProps, NavItem } from '../types';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import { usePathname } from '@/hooks/usePathname';

const DefaultLogo = () => (
  <img
    src="/logo/polapedia.png"
    alt="Logo Polapedia"
    loading="lazy"
    width={500}
    height={500}
  />
);

export default function DefaultNavigation(
  props: Readonly<DefaultNavigationProps>
) {
  const {
    items,
    activeHref,
    logo,
    contactLabel = 'Contact',
    onContactClick,
    hideContactButton,
    sticky = false,
    visualVariant = 'elevated',
    className,
    onClick,
    ...rest
  } = props;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const currentHref = activeHref ?? pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isElevated = visualVariant === 'elevated' || scrolled;

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = item.href === currentHref;

    return (
      <a
        key={item.href}
        href={item.disabled ? undefined : item.href}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) {
            onClick(
              e as React.MouseEvent<HTMLAnchorElement> &
                React.MouseEvent<HTMLElement>
            );
          } else if (isMobile) {
            setIsMobileOpen(false);
          }
        }}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
        className={navItemStyles(isActive, !!item.disabled)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header className={containerStyles(sticky, className)}>
      <nav className={navStyles(isElevated)} {...rest}>
        {/* LEFT: Logo */}
        <div className="shrink-0 cursor-pointer w-37.5 desktop:w-[250px]">
          <a
            href="/"
            className="focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          >
            {logo ?? <DefaultLogo />}
          </a>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden desktop:flex items-center gap-10">
          {items.map((item) => renderNavItem(item))}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {!hideContactButton && (
            <div className="hidden desktop:block">
              <Button
                variant="primary"
                size="md"
                shape="rectangle"
                onClick={onContactClick}
              >
                {contactLabel}
              </Button>
            </div>
          )}

          {/* Hamburger Button */}
          <button
            type="button"
            className="desktop:hidden inline-flex items-center justify-center p-2 text-slate-700 focus:outline-none"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <span className="relative flex w-8 h-8 items-center justify-center">
              <HamburgerIcon className={hamburgerIconStyles(isMobileOpen)} />
              <CloseIcon className={closeIconStyles(isMobileOpen)} />
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={mobileDrawerStyles(isMobileOpen)}>
        <div className="flex flex-col items-center gap-2.5 bg-white font-medium py-6 rounded-2xl">
          {items.map((item) => renderNavItem(item, true))}

          {!hideContactButton &&
            renderNavItem({ label: contactLabel, href: '/contact' }, true)}
        </div>
      </div>
    </header>
  );
}

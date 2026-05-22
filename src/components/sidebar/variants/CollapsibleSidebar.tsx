import { useState } from 'react';
import type { CollapsibleSidebarProps } from '../types';
import PanelLeftIcon from '@/components/icons/PanelLeftIcon';
import { collapsibleSizes, sidebarItemClasses } from '../styles';
import { cn } from '@/utils/cn';

export default function CollapsibleSidebar({
  groups,
  bottomItems = [],
  activeHref,
  open: controlledOpen,
  onOpenChange,
  logo,
  collapsedLogo,
  size = 'md',
  defaultOpen = true,
  className = '',
  panelClassName = '',
}: Omit<CollapsibleSidebarProps, 'variant'>) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  function toggle() {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  }

  function isActive(href: string, isActiveProp?: boolean): boolean {
    return activeHref ? href === activeHref : Boolean(isActiveProp);
  }

  function getItemClasses(
    href: string,
    isActiveProp?: boolean,
    isOpenProp?: boolean
  ): string {
    const active = isActive(href, isActiveProp);
    return cn(
      sidebarItemClasses.base,
      !isOpenProp && 'justify-center px-0',
      active ? sidebarItemClasses.active : sidebarItemClasses.inactive
    );
  }

  return (
    <aside
      data-state={isOpen ? 'expanded' : 'collapsed'}
      className={cn(
        'hidden md:flex flex-col shrink-0',
        'h-screen sticky top-0',
        'bg-white border-r border-gray-100',
        'transition-[width] duration-300 ease-in-out overflow-hidden',
        isOpen
          ? collapsibleSizes[size].expanded
          : collapsibleSizes[size].collapsed,
        'text-[18px]',
        className,
        panelClassName
      )}
    >
      {/* Header - logo area + toggle */}
      <div
        className={cn(
          'flex items-center h-[64px] shrink-0 px-3 relative group/header',
          isOpen ? 'justify-between' : 'justify-center'
        )}
      >
        {/* Logo Area */}
        <div
          className={cn(
            'flex items-center gap-2 overflow-hidden transition-opacity duration-200',
            !isOpen && 'group-hover/header:opacity-0'
          )}
        >
          {isOpen
            ? logo || (
                <>
                  {/* Logo placeholder */}
                  <div className="w-7 h-7 rounded-lg bg-primary-600 shrink-0" />
                  <span className="text-[0.88em] font-semibold text-content-primary whitespace-nowrap">
                    Polapedia
                  </span>
                </>
              )
            : collapsedLogo ||
              logo || (
                <div className="w-7 h-7 rounded-lg bg-primary-600 shrink-0" />
              )}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className={cn(
            'inline-flex items-center justify-center w-8 h-8 rounded-lg text-content-secondary hover:bg-background-hover hover:text-content-primary transition-all duration-200 shrink-0',
            !isOpen
              ? 'absolute inset-0 m-auto opacity-0 group-hover/header:opacity-100'
              : ''
          )}
        >
          <PanelLeftIcon className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Scrollable nav */}
      <nav
        aria-label="Dashboard navigation"
        className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 py-2"
      >
        {groups.map((group, gi) => (
          <div key={gi} className="mb-4">
            {/* Group heading */}
            {group.heading && isOpen && (
              <p className="px-3 mb-1 text-[0.88em] font-bold uppercase tracking-wider text-content-secondary">
                {group.heading}
              </p>
            )}

            <ul className="flex flex-col gap-0.5">
              {group.items.map((item, ii) => (
                <li key={ii}>
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    title={!isOpen ? item.label : undefined}
                    className={getItemClasses(
                      item.href ?? '#',
                      item.isActive,
                      isOpen
                    )}
                  >
                    {/* Icon */}
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                      {item.icon}
                    </div>

                    {/* Label — only visible when expanded */}
                    {isOpen && <span className="truncate">{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      {bottomItems.length > 0 && (
        <div className="px-2 py-3 border-t border-gray-100 flex flex-col gap-0.5">
          {bottomItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={item.onClick}
              title={!isOpen ? item.label : undefined}
              className={getItemClasses(
                item.href ?? '#',
                item.isActive,
                isOpen
              )}
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {item.icon}
              </div>
              {isOpen && <span className="truncate">{item.label}</span>}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}

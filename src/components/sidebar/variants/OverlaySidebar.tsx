import { cn } from '@/utils/cn';
import type { OverlaySidebarProps, SidebarMenuItem } from '../types';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { overlayClasses, overlaySizes, sidebarItemClasses } from '../styles';
import { useMemo, useState } from 'react';

const iconContainerClasses =
  'inline-flex shrink-0 items-center justify-center w-6 h-6';

const chevronBaseClasses =
  'inline-flex shrink-0 items-center justify-center w-5 h-5 transition-transform duration-200';

function getInitialExpandedId(
  items: SidebarMenuItem[],
  defaultExpandedIds?: string[]
): string | null {
  if (!defaultExpandedIds?.length) return null;
  const validIds = new Set(
    items.filter((item) => item.children?.length).map((item) => item.id)
  );
  return defaultExpandedIds.find((id) => validIds.has(id)) ?? null;
}

export default function OverlaySidebar(
  props: Readonly<Omit<OverlaySidebarProps, 'variant'>>
) {
  const {
    items,
    bottomItems = [],
    trigger,
    title,
    className,
    panelClassName,
    size = 'md',
    defaultOpen = false,
    defaultExpandedIds,
  } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [expandedId, setExpandedId] = useState<string | null>(() =>
    getInitialExpandedId([...items, ...bottomItems], defaultExpandedIds)
  );

  const activeItem = useMemo(
    () =>
      [...items, ...bottomItems].find(
        (item) => item.id === expandedId && item.children?.length
      ) ?? null,
    [expandedId, items, bottomItems]
  );

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function getItemClasses(isActive?: boolean, isChild?: boolean) {
    return cn(
      'w-full flex items-center justify-between gap-4 text-left transition-all',
      isChild ? overlayClasses.childItem : overlayClasses.topLevelItem,
      isActive ? sidebarItemClasses.active : sidebarItemClasses.inactive
    );
  }

  function renderTopLevelItem(item: SidebarMenuItem) {
    const hasChildren = Boolean(item.children?.length);
    const isExpanded = expandedId === item.id;

    const inner = (
      <span className="flex min-w-0 items-center gap-3">
        {item.icon && <span className={iconContainerClasses}>{item.icon}</span>}
        <span className="truncate">{item.label}</span>
      </span>
    );

    if (hasChildren) {
      return (
        <li key={item.id}>
          <button
            type="button"
            className={getItemClasses(isExpanded)}
            onClick={() => toggleExpand(item.id)}
            aria-expanded={isExpanded}
            aria-controls={`sidebar-submenu-${item.id}`}
          >
            {inner}
            <span className={cn(chevronBaseClasses, isExpanded && 'rotate-90')}>
              <ChevronRightIcon />
            </span>
          </button>
        </li>
      );
    }

    if (item.href) {
      return (
        <li key={item.id}>
          <a
            href={item.href}
            className={getItemClasses(item.isActive)}
            onClick={item.onClick}
          >
            {inner}
          </a>
        </li>
      );
    }

    return (
      <li key={item.id}>
        <button
          type="button"
          className={getItemClasses(item.isActive)}
          onClick={item.onClick}
        >
          {inner}
        </button>
      </li>
    );
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        aria-label="Open side menu"
        aria-expanded={isOpen}
        aria-controls="sidebar-menu-panel"
        className={cn(
          'inline-flex items-center justify-center cursor-pointer select-none',
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        {trigger}
      </button>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close side menu overlay"
          className={overlayClasses.base}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <aside
        id="sidebar-menu-panel"
        aria-hidden={!isOpen}
        className={cn(
          overlayClasses.panel,
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'text-[18px]',
          panelClassName
        )}
      >
        {/* Left panel */}
        <div
          className={cn(
            'flex flex-col h-full overflow-hidden',
            overlaySizes[size],
            title ? 'pt-0' : 'pt-4'
          )}
        >
          {title && (
            <div className="px-5 py-5 text-[1.11em] font-bold text-content-primary">
              {title}
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-2">
            <nav aria-label="Sidebar menu">
              <ul className="flex flex-col gap-1">
                {items.map(renderTopLevelItem)}
              </ul>
            </nav>
          </div>
          {bottomItems.length > 0 && (
            <div className="px-2 py-3">
              <ul className="flex flex-col gap-1">
                {bottomItems.map(renderTopLevelItem)}
              </ul>
            </div>
          )}
        </div>

        {/* Right panel - submenu */}
        {activeItem && (
          <div
            id={`sidebar-submenu-${activeItem.id}`}
            className="flex w-85 flex-col overflow-hidden border-l border-content-tertiary/50"
          >
            <div className="px-5 py-5 text-[1.11em] font-bold text-content-primary">
              {activeItem.label}
            </div>
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2">
              <ul className="flex flex-col gap-1">
                {activeItem.children?.map((child) => (
                  <li key={child.id}>
                    {child.href ? (
                      <a
                        href={child.href}
                        className={getItemClasses(false, true)}
                        onClick={child.onClick}
                      >
                        <span className="truncate">{child.label}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className={getItemClasses(false, true)}
                        onClick={child.onClick}
                      >
                        <span className="truncate">{child.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

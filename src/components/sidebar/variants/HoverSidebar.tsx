import type { HoverSidebarProps } from '../types';
import { hoverSizes, sidebarItemClasses } from '../styles';
import { cn } from '@/utils/cn';

export default function HoverSidebar({
  items,
  bottomItems = [],
  activeHref,
  size = 'md',
  className = '',
  panelClassName = '',
}: Omit<HoverSidebarProps, 'variant'>) {
  const asideClasses = cn(
    'hidden md:block shrink-0',
    'h-[calc(100vh-140px)] sticky top-[120px]',
    'my-6 mx-6 z-40 transition-all duration-300',
    hoverSizes[size].collapsed,
    className
  );

  function isActive(href: string, isActiveProp?: boolean): boolean {
    return activeHref ? href === activeHref : Boolean(isActiveProp);
  }

  function getItemClasses(href: string, isActiveProp?: boolean): string {
    const active = isActive(href, isActiveProp);
    return cn(
      sidebarItemClasses.base,
      'mb-2 mx-3.5 justify-center group-hover:justify-start px-0 group-hover:px-3 gap-0 group-hover:gap-3 transition-all duration-300',
      active ? sidebarItemClasses.active : sidebarItemClasses.inactive
    );
  }

  return (
    <aside className={asideClasses}>
      <div
        className={cn(
          'group absolute top-0 left-0 h-full',
          hoverSizes[size].collapsed,
          hoverSizes[size].expanded,
          'bg-white rounded-[40px] py-6',
          'flex flex-col shadow-sm',
          'transition-all duration-300 overflow-hidden',
          'text-[18px]',
          panelClassName
        )}
      >
        {/* Main items */}
        <nav aria-label="Dashboard navigation" className="flex flex-col">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={item.onClick}
              className={getItemClasses(item.href ?? '#', item.isActive)}
            >
              <div className="w-6 h-6 shrink-0 flex justify-center items-center [&>svg]:w-full [&>svg]:h-full">
                {item.icon}
              </div>
              <span className="w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all duration-300 overflow-hidden">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom items */}
        {bottomItems.length > 0 && (
          <div className="mt-auto">
            {bottomItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className={getItemClasses(item.href ?? '#', item.isActive)}
              >
                <div className="w-6 h-6 shrink-0 flex justify-center items-center [&>svg]:w-full [&>svg]:h-full">
                  {item.icon}
                </div>
                <span className="w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all duration-300 overflow-hidden">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

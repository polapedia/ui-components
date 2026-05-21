import type { TabsProps } from '../types';
import { getTabClassName, getTabContainerClassName } from '../styles/tabs';
import { cn } from '@/utils/cn';

export default function DefaultTabs({
  tabs,
  value,
  onValueChange,
  className,
  variant = 'underline',
  size = 'md',
  iconPosition = 'left',
}: Readonly<TabsProps>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto overflow-y-hidden no-scrollbar',
        className
      )}
    >
      <nav aria-label="Tabs" className={getTabContainerClassName({ variant })}>
        {tabs.map((tab) => {
          const isActive = tab.value === value;

          const commonClasses = getTabClassName({
            isActive,
            isDisabled: tab.disabled,
            variant,
            size,
            iconPosition,
            className,
          });

          const content = (
            <>
              {tab.icon ? tab.icon : null}
              <span>{tab.label}</span>
            </>
          );

          if (tab.href && !onValueChange && !tab.disabled) {
            return (
              <a
                key={tab.value}
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={commonClasses}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={tab.value}
              type="button"
              disabled={tab.disabled}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onValueChange?.(tab.value)}
              className={commonClasses}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

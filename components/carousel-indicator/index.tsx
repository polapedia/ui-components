import { ComponentProps } from 'react';

type Size = 'sm' | 'md' | 'lg';

type DivProps = Omit<ComponentProps<'div'>, 'onChange'>;

interface CarouselIndicatorProps extends DivProps {
  size?: Size;
  total: number;
  activeIndex: number;
  onActiveChange?: (_nextIndex: number) => void;
  disabled?: boolean;
}

const baseClasses = 'inline-flex items-center';

const gapClasses: Record<Size, string> = {
  sm: 'gap-2',
  md: 'gap-2',
  lg: 'gap-3',
};

const dotClasses: Record<Size, string> = {
  sm: 'w-2 h-2', // 8x8
  md: 'w-2 h-2', // 8x8
  lg: 'w-2 h-2', // 8x8
};

const openClasses: Record<Size, string> = {
  sm: 'w-4 h-2', // 16x8
  md: 'w-6 h-2', // 24x8
  lg: 'w-8 h-2', // 32x8
};

export default function CarouselIndicator({
  size = 'md',
  total,
  activeIndex,
  onActiveChange,
  disabled,
  className,
  ...props
}: CarouselIndicatorProps) {
  const isInteractive = typeof onActiveChange === 'function' && !disabled;

  return (
    <div
      className={[baseClasses, gapClasses[size], className || '']
        .filter(Boolean)
        .join(' ')}
      role={isInteractive ? 'tablist' : undefined}
      aria-label="Carousel indicators"
      {...props}
    >
      {Array.from({ length: Math.max(0, total) }).map((_, i) => {
        const isActive = i === activeIndex;

        const shape = isActive ? openClasses[size] : dotClasses[size];

        const fill = isActive
          ? 'bg-linear-to-b from-gradient-primary to-gradient-secondary'
          : 'bg-content-secondary/30';

        const common = 'rounded-full transition-all duration-200 shrink-0';

        if (!isInteractive) {
          return (
            <span
              key={i}
              className={[common, shape, fill].join(' ')}
              aria-hidden="true"
            />
          );
        }

        return (
          <button
            key={i}
            type="button"
            className={[
              common,
              shape,
              fill,
              'cursor-pointer',
              'hover:opacity-90',
              'active:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/40',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
            onClick={() => onActiveChange?.(i)}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
          />
        );
      })}
    </div>
  );
}

export type { CarouselIndicatorProps };

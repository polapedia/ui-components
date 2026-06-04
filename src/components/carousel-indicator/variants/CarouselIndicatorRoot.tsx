import { carouselIndicatorStyles } from '../styles';
import type { CarouselIndicatorProps } from '../types';

export default function CarouselIndicatorRoot(
  props: Readonly<CarouselIndicatorProps>
) {
  const {
    size = 'md',
    total,
    activeIndex,
    onActiveChange,
    disabled,
    className,
    ...rest
  } = props;
  const isInteractive = typeof onActiveChange === 'function' && !disabled;
  const indicators = Array.from(
    { length: Math.max(0, total) },
    (_, position) => ({
      key: `carousel-indicator-${position}`,
      position,
    })
  );

  return (
    <div
      className={[
        carouselIndicatorStyles.base,
        carouselIndicatorStyles.gap[size],
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      role={isInteractive ? 'tablist' : undefined}
      aria-label="Carousel indicators"
      {...rest}
    >
      {indicators.map(({ key, position }) => {
        const isActive = position === activeIndex;
        const shape = isActive
          ? carouselIndicatorStyles.open[size]
          : carouselIndicatorStyles.dot[size];
        const fill = isActive
          ? carouselIndicatorStyles.activeFill
          : carouselIndicatorStyles.inactiveFill;
        const classNames = [carouselIndicatorStyles.common, shape, fill];

        if (!isInteractive) {
          return (
            <span
              key={key}
              className={classNames.join(' ')}
              aria-hidden="true"
            />
          );
        }

        return (
          <button
            key={key}
            type="button"
            className={[
              ...classNames,
              carouselIndicatorStyles.interactive,
            ].join(' ')}
            onClick={() => onActiveChange?.(position)}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${position + 1}`}
          />
        );
      })}
    </div>
  );
}

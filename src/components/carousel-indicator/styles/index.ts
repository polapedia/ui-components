import type { CarouselIndicatorSize } from '../types';

export const carouselIndicatorStyles = {
  base: 'inline-flex items-center',
  common: 'rounded-full transition-all duration-200 shrink-0',
  gap: {
    sm: 'gap-2',
    md: 'gap-2',
    lg: 'gap-3',
  } satisfies Record<CarouselIndicatorSize, string>,
  dot: {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  } satisfies Record<CarouselIndicatorSize, string>,
  open: {
    sm: 'w-4 h-3',
    md: 'w-6 h-3',
    lg: 'w-8 h-3',
  } satisfies Record<CarouselIndicatorSize, string>,
  activeFill: 'bg-linear-to-b from-gradient-primary to-gradient-secondary',
  inactiveFill: 'bg-content-secondary/30',
  interactive: [
    'cursor-pointer',
    'hover:opacity-90',
    'active:opacity-80',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
};

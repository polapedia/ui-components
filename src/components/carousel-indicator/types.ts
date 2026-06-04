import type { ComponentProps } from 'react';

export type CarouselIndicatorSize = 'sm' | 'md' | 'lg';

type DivProps = Omit<ComponentProps<'div'>, 'onChange'>;

export interface CarouselIndicatorProps extends DivProps {
  size?: CarouselIndicatorSize;
  total: number;
  activeIndex: number;
  onActiveChange?: (_nextIndex: number) => void;
  disabled?: boolean;
}

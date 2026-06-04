import type { CarouselIndicatorProps } from './types';
import CarouselIndicatorRoot from './variants/CarouselIndicatorRoot';

export type * from './types';

export default function CarouselIndicator(
  props: Readonly<CarouselIndicatorProps>
) {
  return <CarouselIndicatorRoot {...props} />;
}

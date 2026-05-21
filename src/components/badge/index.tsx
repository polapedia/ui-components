import type { BadgeProps } from './types';
import DefaultBadge from './variants/DefaultBadge';

export type * from './types';

export default function Badge(props: BadgeProps) {
  return <DefaultBadge {...props} />;
}

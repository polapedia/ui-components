import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeSize = 'm' | 'l';
export type BadgeColor =
  | 'red'
  | 'neutral'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info';
export type BadgeVariant = 'primary' | 'secondary' | 'tertiary';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

import type { ReactNode } from 'react';

export type TabVariant =
  | 'underline'
  | 'underline-full'
  | 'pills'
  | 'rectangle'
  | 'contained';
export type TabIconPosition = 'left' | 'top';
export type TabSize = 'sm' | 'md';

export interface TabItem {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onValueChange?: (_value: string) => void;
  variant?: TabVariant;
  size?: TabSize;
  iconPosition?: TabIconPosition;
  className?: string;
}

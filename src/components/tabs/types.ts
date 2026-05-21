import type { ReactNode } from 'react';

export type TabVariant = 'underline' | 'underline-full' | 'pills' | 'contained';
export type TabIconPosition = 'left' | 'top';

export interface TabItem {
  label: string; // Sesuai dokumen requirement
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
  iconPosition?: TabIconPosition;
  className?: string;
}

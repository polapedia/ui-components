import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownShape = 'pill' | 'rounded' | 'square';

export type TriggerVariant =
  | 'primary'
  | 'error'
  | 'inverted'
  | 'disabled'
  | 'outline'
  | 'ghost';

export type MenuVariant = 'default' | 'dark' | 'light';

export type ItemVariant = 'default' | 'danger' | 'selected' | 'disabled';
export type ItemSize = 'sm' | 'md' | 'lg';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: ItemVariant;
  onClick?: () => void;
}

export interface ButtonDropdownProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  label?: string;
  triggerVariant?: TriggerVariant;
  menuVariant?: MenuVariant;
  size?: DropdownSize;
  shape?: DropdownShape;
  disabled?: boolean;
  showDivider?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  itemSize?: ItemSize;
  items?: DropdownItem[];
  onItemSelect?: (_item: DropdownItem) => void;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  updateLabelOnSelect?: boolean;
}

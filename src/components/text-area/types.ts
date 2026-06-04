import type { ComponentProps, ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type State = 'default' | 'error' | 'success';

export interface TextAreaProps extends Omit<
  ComponentProps<'textarea'>,
  'size'
> {
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
  rightIcon?: ReactNode;
  maxLength?: number;
}

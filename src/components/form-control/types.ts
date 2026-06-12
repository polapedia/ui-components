import { type ComponentProps } from 'react';

export type FormControlSize = 'sm' | 'md' | 'lg' | 'xl';
export type FormControlState = 'default' | 'error' | 'success';

export interface BaseFormControlProps extends Omit<
  ComponentProps<'input'>,
  'size'
> {
  size?: FormControlSize;
  state?: FormControlState;
  label?: string;
  helperText?: string;
}

import type { Size, State } from '../types';

export const sizeClasses: Record<Size, string> = {
  sm: 'h-[120px]',
  md: 'h-[150px]',
  lg: 'h-[200px]',
};

export const stateClasses: Record<State, string> = {
  default:
    'bg-white hover:bg-background-hover focus-within:ring-1 focus-within:ring-primary-600',
  error:
    'bg-white hover:bg-background-hover focus-within:ring-1 focus-within:ring-red-500',
  success:
    'bg-white hover:bg-background-hover focus-within:ring-1 focus-within:ring-green-500',
};

export const disabledClasses = 'bg-neutral-300 cursor-not-allowed select-none';

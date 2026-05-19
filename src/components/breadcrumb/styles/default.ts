import type { Size } from '../types';

export const baseClasses = 'inline-flex items-center';

export const textSizeClasses: Record<Size, string> = {
  sm: 'text-[14px]',
  md: 'text-[16px]',
  lg: 'text-[18px]',
};

export const iconSizeClasses: Record<Size, string> = {
  sm: 'w-[18px] h-[18px]',
  md: 'w-[20px] h-[20px]',
  lg: 'w-[24px] h-[24px]',
};

export const defaultTextClass = 'text-content-primary';
export const currentTextClass =
  'bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text text-transparent';

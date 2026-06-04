import type { BadgeColor, BadgeSize, BadgeVariant } from '../types';

export const sizeClasses: Record<BadgeSize, string> = {
  m: 'h-[24px] rounded-[8px] text-[10px] px-2 gap-1',
  l: 'h-[28px] rounded-[8px] text-[14px] px-2 gap-1.5',
};

export const colorClasses: Record<BadgeColor, Record<BadgeVariant, string>> = {
  red: {
    primary:
      'bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    secondary: 'bg-primary-600 text-white',
    tertiary: 'border border-primary-600 text-primary-600',
  },
  neutral: {
    primary: 'bg-white border-none text-content-primary',
    secondary: 'bg-neutral-200 text-content-primary',
    tertiary: 'border border-neutral-200 text-content-primary',
  },
  danger: {
    primary: 'bg-accents-red text-white',
    secondary: 'bg-error-background text-accents-red',
    tertiary: 'border border-accents-red text-accents-red',
  },
  warning: {
    primary: 'bg-[#FFE100] text-content-primary',
    secondary: 'bg-[#FFF6B0] text-[#594F00]',
    tertiary: 'border border-[#FFE100] text-[#BFA900]',
  },
  success: {
    primary: 'bg-accents-green text-white',
    secondary: 'bg-[#C0EECC] text-accents-green',
    tertiary: 'border border-accents-green text-accents-green',
  },
  info: {
    primary: 'bg-accents-blue text-white',
    secondary: 'bg-[#B0DAFF] text-accents-blue',
    tertiary: 'border border-accents-blue text-accents-blue',
  },
};

export const baseClasses =
  'inline-flex items-center justify-center font-regular whitespace-nowrap transition-colors select-none';

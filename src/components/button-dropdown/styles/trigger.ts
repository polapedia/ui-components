import { cn } from '@/utils/cn';
import type { DropdownShape, DropdownSize, TriggerVariant } from '../types';

export const triggerBaseClasses =
  'flex items-center justify-between w-full px-4 transition-all duration-200';

export const triggerSizeClasses: Record<DropdownSize, string> = {
  sm: 'h-[40px] text-[14px]',
  md: 'h-[56px] text-[20px]',
  lg: 'h-[70px] text-[24px]',
};

export const triggerShapeClasses: Record<
  DropdownShape,
  Record<DropdownSize, string>
> = {
  pill: {
    sm: 'rounded-[22px]',
    md: 'rounded-[30px]',
    lg: 'rounded-[37px]',
  },
  rounded: {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
  },
  square: {
    sm: 'rounded-lg',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  },
};

export const triggerVariantClasses: Record<TriggerVariant, string> = {
  primary:
    'text-white bg-linear-to-b from-gradient-primary to-gradient-secondary hover:brightness-110 active:brightness-90',
  inverted:
    'text-white bg-background-inverse hover:bg-background-inverse/90 active:bg-background-inverse',
  error:
    'text-white bg-accents-red hover:bg-accents-red/90 active:bg-accents-red',
  disabled:
    'text-white bg-background-disabled hover:bg-background-disabled active:bg-background-disabled',
  outline:
    'text-white border border-white/30 bg-transparent hover:bg-white/10 active:bg-white/15',
  ghost: 'text-white bg-transparent hover:bg-white/10 active:bg-white/15',
};

export const dividerClasses: Record<TriggerVariant, string> = {
  primary: 'bg-white/30',
  inverted: 'bg-white/20',
  error: 'bg-white/30',
  disabled: 'bg-white/30',
  outline: 'bg-white/20',
  ghost: 'bg-white/20',
};

export function getTriggerClassName({
  size,
  shape,
  triggerVariant,
  disabled,
}: {
  size: DropdownSize;
  shape: DropdownShape;
  triggerVariant: TriggerVariant;
  disabled: boolean;
}) {
  return cn(
    triggerBaseClasses,
    triggerSizeClasses[size],
    triggerShapeClasses[shape][size],
    triggerVariantClasses[triggerVariant],
    disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'
  );
}

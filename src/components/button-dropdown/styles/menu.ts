import type { DropdownShape, DropdownSize, MenuVariant } from '../types';

export const menuVariantClasses: Record<MenuVariant, string> = {
  default: 'bg-background-disabled text-white shadow-lg border border-white/10',
  dark: 'bg-zinc-800 text-white shadow-lg border border-white/10',
  light: 'bg-white text-zinc-900 shadow-lg border border-zinc-200',
};

export const menuShapeClasses: Record<DropdownShape, string> = {
  pill: 'rounded-2xl',
  rounded: 'rounded-xl',
  square: 'rounded-lg',
};

export const menuWidthClasses: Record<DropdownSize, string> = {
  sm: 'min-w-[100px]',
  md: 'min-w-[200px]',
  lg: 'min-w-[300px]',
};

export function getMenuPanelClassName({
  size,
  shape,
  menuVariant,
}: {
  size: DropdownSize;
  shape: DropdownShape;
  menuVariant: MenuVariant;
}) {
  return [
    'overflow-hidden',
    menuWidthClasses[size],
    menuVariantClasses[menuVariant],
    menuShapeClasses[shape],
  ].join(' ');
}

export function getContentPanelClassName({
  shape,
  menuVariant,
}: {
  shape: DropdownShape;
  menuVariant: MenuVariant;
}) {
  return [
    'w-fit min-w-66 p-3 text-left leading-relaxed whitespace-normal wrap-break-word font-normal',
    menuVariantClasses[menuVariant],
    menuShapeClasses[shape],
  ].join(' ');
}

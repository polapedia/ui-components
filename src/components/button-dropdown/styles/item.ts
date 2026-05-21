import type { ItemSize, ItemVariant } from '../types';

export const itemVariantClasses: Record<ItemVariant, string> = {
  default: 'text-inherit hover:bg-black/10 data-[light=true]:hover:bg-zinc-100',
  danger: 'text-red-400 hover:bg-red-500/10 data-[light=true]:hover:bg-red-50',
  selected: 'font-semibold bg-white/10 data-[light=true]:bg-zinc-100',
  disabled: 'opacity-50 cursor-not-allowed',
};

export const itemSizeClasses: Record<ItemSize, string> = {
  sm: 'text-sm py-2',
  md: 'text-[20px] py-3',
  lg: 'text-[24px] py-4',
};

export function getItemClassName({
  itemSize,
  itemVariant,
  isLightMenu,
  disabled,
}: {
  itemSize: ItemSize;
  itemVariant: ItemVariant;
  isLightMenu: boolean;
  disabled?: boolean;
}) {
  const variantClass = disabled
    ? itemVariantClasses.disabled
    : itemVariantClasses[itemVariant];

  return [
    'w-full flex items-center gap-3 px-4 text-left transition-colors duration-200',
    itemSizeClasses[itemSize],
    variantClass,
    isLightMenu ? 'data-[light=true]' : '',
  ].join(' ');
}

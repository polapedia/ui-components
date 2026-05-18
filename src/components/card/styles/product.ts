import type { CardProductSize } from '../types';

export const productStyles: Record<
  CardProductSize,
  {
    container: string;
    cardPadding: string;
    cardRadius: string;
    imageHeight: string;
    imageRadius: string;
    title: string;
    subtitle: string;
    description: string;
    meta: string;
    topIcon: string;
    rightIcon: string;
    wishlist: string;
    wishlistOffset: string;
    contentRightPadding: string;
    badgePosition: string;
  }
> = {
  sm: {
    container: 'w-[188px]',
    cardPadding: 'p-3',
    cardRadius: 'rounded-2xl',
    imageHeight: 'h-[124px]',
    imageRadius: 'rounded-xl',
    title: 'font-bold text-base text-black line-clamp-1 tab:line-clamp-none',
    subtitle: 'font-medium text-sm text-black line-clamp-1',
    description: 'font-normal text-sm text-black line-clamp-2 mt-2',
    meta: 'text-sm',
    topIcon:
      'w-6 h-6 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    rightIcon:
      'w-6 h-6 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    wishlist: 'w-8 h-8',
    wishlistOffset: 'top-[148px] right-3',
    contentRightPadding: 'pr-10',
    badgePosition: 'top-3 left-3',
  },
  md: {
    container: 'w-[190px]',
    cardPadding: 'p-4',
    cardRadius: 'rounded-2xl',
    imageHeight: 'h-[154px]',
    imageRadius: 'rounded-2xl',
    title: 'font-bold text-xl text-black line-clamp-1 tab:line-clamp-none',
    subtitle: 'font-medium text-sm text-black line-clamp-1',
    description: 'font-normal text-sm text-black line-clamp-3 mt-2',
    meta: 'text-sm',
    topIcon:
      'w-14 h-14 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    rightIcon:
      'w-6 h-6 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    wishlist: 'w-10 h-10',
    wishlistOffset: 'top-[176px] right-4',
    contentRightPadding: 'pr-12',
    badgePosition: 'top-3 left-3',
  },
  lg: {
    container: 'w-[277px]',
    cardPadding: 'p-4',
    cardRadius: 'rounded-2xl',
    imageHeight: 'h-[260px]',
    imageRadius: 'rounded-2xl',
    title: 'font-bold text-xl text-black line-clamp-1 tab:line-clamp-none',
    subtitle: 'font-medium text-sm text-black line-clamp-2',
    description: 'font-normal text-sm text-black line-clamp-2 mt-2',
    meta: 'text-sm',
    topIcon:
      'w-14 h-14 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    rightIcon:
      'w-10 h-10 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    wishlist: 'w-11 h-11',
    wishlistOffset: 'top-[282px] right-4',
    contentRightPadding: 'pr-14',
    badgePosition: 'top-4 left-4',
  },
  xl: {
    container: 'w-[362px]',
    cardPadding: 'p-5',
    cardRadius: 'rounded-[28px]',
    imageHeight: 'h-[260px]',
    imageRadius: 'rounded-[24px]',
    title: 'font-bold text-xl text-black line-clamp-1 tab:line-clamp-none',
    subtitle: 'font-medium text-sm text-black line-clamp-1',
    description: 'font-normal text-sm text-black line-clamp-2 mt-2',
    meta: 'text-base',
    topIcon:
      'w-14 h-14 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    rightIcon:
      'w-10 h-10 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    wishlist: 'w-12 h-12',
    wishlistOffset: 'top-[280px] right-5',
    contentRightPadding: 'pr-16',
    badgePosition: 'top-4 left-4',
  },
  '2xl': {
    container: 'w-[362px]',
    cardPadding: 'p-6',
    cardRadius: 'rounded-[32px]',
    imageHeight: 'h-[260px]',
    imageRadius: 'rounded-[28px]',
    title: 'font-bold text-[32px] text-black line-clamp-1 tab:line-clamp-none',
    subtitle: 'font-medium text-xl text-black line-clamp-1',
    description: 'font-normal text-xl text-black line-clamp-2 mt-2',
    meta: 'text-lg',
    topIcon:
      'w-14 h-14 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    rightIcon:
      'w-10 h-10 rounded-full text-white font-bold text-sm shadow-sm bg-linear-to-b from-gradient-primary to-gradient-secondary flex items-center justify-center',
    wishlist: 'w-12 h-12',
    wishlistOffset: 'top-[284px] right-6',
    contentRightPadding: 'pr-16',
    badgePosition: 'top-4 left-4',
  },
};

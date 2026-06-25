import type { CardMarketplaceReviewSize } from '../types';

export const marketplaceReviewStyles: Record<
  CardMarketplaceReviewSize,
  {
    container: string;
    authorName: string;
    reviewDate: string;
    reviewText: string;
    star: string;
    starsGap: string;
    avatar: string;
    avatarSize: { w: number; h: number };
    avatarFallback: string;
    reviewImageBox: string;
    productName: string;
    productPrice: string;
    viewProductLabel: string;
    sellerResponseLabel: string;
    sellerResponseText: string;
    helpfulText: string;
  }
> = {
  sm: {
    container:
      'flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4',
    authorName: 'text-base font-semibold text-black',
    reviewDate: 'text-sm text-black',
    reviewText: 'text-sm leading-relaxed text-[#1A1C1C]',
    star: 'h-4 w-4',
    starsGap: 'gap-1',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 32, h: 32 },
    avatarFallback: 'h-8 w-8 text-xs',
    reviewImageBox: 'h-14 w-14 rounded-lg',
    productName: 'text-sm text-content-secondary',
    productPrice: 'text-sm text-content-primary',
    viewProductLabel: 'text-xs font-medium',
    sellerResponseLabel: 'text-xs',
    sellerResponseText: 'text-xs leading-relaxed',
    helpfulText: 'text-xs',
  },
  md: {
    container:
      'flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6',
    authorName: 'text-base font-semibold text-black',
    reviewDate: 'text-base text-black',
    reviewText: 'text-base leading-relaxed text-[#1A1C1C]',
    star: 'h-5 w-5',
    starsGap: 'gap-1',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 40, h: 40 },
    avatarFallback: 'h-10 w-10 text-sm',
    reviewImageBox: 'h-18 w-18 rounded-xl',
    productName: 'text-base text-content-secondary',
    productPrice: 'text-base text-content-primary',
    viewProductLabel: 'text-sm font-medium',
    sellerResponseLabel: 'text-sm',
    sellerResponseText: 'text-sm leading-relaxed',
    helpfulText: 'text-sm',
  },
  lg: {
    container:
      'flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6',
    authorName: 'text-lg font-semibold text-black',
    reviewDate: 'text-lg text-black',
    reviewText: 'text-lg leading-relaxed text-[#1A1C1C]',
    star: 'h-5 w-5',
    starsGap: 'gap-1.5',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
    avatarFallback: 'h-12 w-12 text-base',
    reviewImageBox: 'h-20 w-20 rounded-xl',
    productName: 'text-base text-content-secondary',
    productPrice: 'text-base text-content-primary',
    viewProductLabel: 'text-sm font-medium',
    sellerResponseLabel: 'text-sm',
    sellerResponseText: 'text-sm leading-relaxed',
    helpfulText: 'text-sm',
  },
  xl: {
    container:
      'flex flex-col gap-5 rounded-[28px] border border-neutral-200 bg-white p-8',
    authorName: 'text-xl font-semibold text-black',
    reviewDate: 'text-lg text-black',
    reviewText: 'text-xl leading-relaxed text-[#1A1C1C]',
    star: 'h-6 w-6',
    starsGap: 'gap-2',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 56, h: 56 },
    avatarFallback: 'h-14 w-14 text-lg',
    reviewImageBox: 'h-24 w-24 rounded-2xl',
    productName: 'text-lg text-content-secondary',
    productPrice: 'text-lg text-content-primary',
    viewProductLabel: 'text-base font-medium',
    sellerResponseLabel: 'text-base',
    sellerResponseText: 'text-base leading-relaxed',
    helpfulText: 'text-base',
  },
};

import type { CardReviewSize } from '../types';

export const reviewStyles: Record<
  CardReviewSize,
  {
    container: string;
    star: string;
    title: string;
    description: string;
    author: string;
    role: string;
    avatar: string;
    avatarSize: { w: number; h: number };
    starsGap: string;
  }
> = {
  sm: {
    container:
      'h-full w-full bg-white rounded-2xl py-[32px] px-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[24px] h-[24px] text-[#FC0]',
    title: 'font-bold text-base text-black mt-[16px] mb-[8px] px-0 mx-0',
    description: 'text-base font-normal text-black',
    author: 'font-bold text-base text-neutral-900 mb-[8px]',
    role: 'text-sm text-neutral-900',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 62, h: 62 },
  },
  md: {
    container:
      'h-full w-full bg-white rounded-2xl p-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[24px] h-[24px] text-[#FC0]',
    title: 'font-bold text-base text-black my-2.5 px-0 mx-0',
    description: 'text-base text-black',
    author: 'font-semibold text-base text-neutral-900 mb-[8px]',
    role: 'text-base text-neutral-900',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
  },
  lg: {
    container:
      'h-full w-full bg-white rounded-2xl p-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[24px] h-[24px] text-[#FC0]',
    title: 'font-bold text-[16px] text-black my-[10px] px-0 mx-0',
    description: 'text-[16px] font-normal text-black',
    author: 'font-semibold text-base text-neutral-900 mb-[8px]',
    role: 'text-base text-neutral-900 font-normal',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
  },
  xl: {
    container:
      'h-full w-full bg-white rounded-[50px] p-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[32px] h-[32px] text-[#FC0]',
    title: 'font-bold text-[24px] text-black my-[10px] px-0 mx-0',
    description: 'text-[18px] font-normal text-black',
    author: 'font-semibold text-[20px] text-neutral-900 mb-[4px]',
    role: 'text-[18px] text-neutral-900 font-normal',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
  },
  '2xl': {
    container:
      'h-full w-full bg-white rounded-[50px] p-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[32px] h-[32px] text-[#FC0]',
    title: 'font-bold text-[24px] text-black my-[10px] px-0 mx-0',
    description: 'text-[18px] font-normal text-black',
    author: 'font-semibold text-[20px] text-neutral-900 mb-[4px]',
    role: 'text-[18px] text-neutral-900 font-normal',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
  },
  '3xl': {
    container:
      'h-full w-full bg-white rounded-[50px] p-[24px] flex flex-col shadow-xl',
    starsGap: 'gap-x-[4px]',
    star: 'w-[32px] h-[32px] text-[#FC0]',
    title: 'font-bold text-[24px] text-black my-[10px] px-0 mx-0',
    description: 'text-[18px] font-normal text-black',
    author: 'font-semibold text-[20px] text-neutral-900 mb-[4px]',
    role: 'text-[18px] text-neutral-900 font-normal',
    avatar: 'rounded-full object-cover',
    avatarSize: { w: 48, h: 48 },
  },
};

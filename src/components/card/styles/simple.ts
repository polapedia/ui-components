import type { CardSize } from '../types';

export const simpleStyles: Record<
  CardSize,
  {
    container: string;
    topBlockMarginTop: string;
    topIcon: string;
    title: string;
    description: string;
  }
> = {
  sm: {
    container:
      'relative px-6 py-10 rounded-2xl h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-10 h-10 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[16px] font-bold my-[8px]',
    description: 'text-[14px] font-normal opacity-90',
  },
  md: {
    container:
      'relative px-6 py-16 rounded-[50px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[18px] font-bold my-[12px]',
    description: 'text-[14px] font-normal opacity-90',
  },
  lg: {
    container:
      'relative px-6 py-[76px] rounded-[50px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[24px] font-bold my-[12px]',
    description: 'text-[18px] font-normal opacity-90',
  },
  xl: {
    container:
      'relative px-6 py-[86px] rounded-[50px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[32px] font-bold my-[12px]',
    description: 'text-[24px] font-normal opacity-90',
  },
};

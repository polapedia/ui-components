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
      'relative px-6 pt-14 pb-10 rounded-2xl min-h-[280px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-10 h-10 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[16px] font-bold my-[8px]',
    description: 'text-[14px] font-normal opacity-90',
  },
  md: {
    container:
      'relative px-6 pt-22 pb-12 rounded-[50px] min-h-[360px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[18px] font-bold my-[12px]',
    description: 'text-[16px] font-normal opacity-90',
  },
  lg: {
    container:
      'relative px-6 pt-28 pb-14 rounded-[50px] min-h-[420px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[20px] font-bold my-[12px]',
    description: 'text-[18px] font-normal opacity-90',
  },
  xl: {
    container:
      'relative px-6 pt-28 pb-14 rounded-[50px] min-h-[420px] h-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white',
    topBlockMarginTop: '',
    topIcon:
      'w-14 h-14 rounded-full text-[#323232] shadow-md bg-white flex items-center justify-center',
    title: 'text-[20px] font-bold my-[12px]',
    description: 'text-[18px] font-normal opacity-90',
  },
};

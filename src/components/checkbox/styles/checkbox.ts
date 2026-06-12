export const inputSizeClasses: Record<string, string> = {
  sm: 'w-[20px] h-[20px] rounded-[4px]',
  md: 'w-[32px] h-[32px] rounded-[8px]',
  lg: 'w-[40px] h-[40px] rounded-[8px]',
  xl: 'w-[58px] h-[58px] rounded-[8px]',
};

export const checkmarkSizeClasses: Record<string, string> = {
  sm: 'w-[12px] h-[12px]',
  md: 'w-[18px] h-[18px]',
  lg: 'w-[22px] h-[22px]',
  xl: 'w-[32px] h-[32px]',
};

export const labelSizeClasses: Record<string, string> = {
  sm: 'text-[14px] leading-4',
  md: 'text-[16px] leading-5',
  lg: 'text-[18px] leading-6',
  xl: 'text-[22px] leading-7',
};

export const focusRingBySize: Record<string, string> = {
  sm: 'ring-[2px] ring-offset-[1.5px]',
  md: 'ring-[2px] ring-offset-[1.5px]',
  lg: 'ring-[2px] ring-offset-[1.5px]',
  xl: 'ring-[3px] ring-offset-[3px]',
};

export const baseInputClasses = [
  'peer col-start-1 row-start-1 appearance-none border-2 shrink-0',
  'transition-colors duration-200 ease-in-out',
  'focus:outline-none',
].join(' ');

export const baseOverlayClasses = [
  'pointer-events-none col-start-1 row-start-1',
  'transition-opacity duration-200 ease-in-out',
].join(' ');

export const baseIconClasses = [
  'pointer-events-none col-start-1 row-start-1 z-10',
  'self-center justify-self-center',
].join(' ');

export const baseFocusRingClasses = [
  'pointer-events-none col-start-1 row-start-1 absolute inset-0',
  'opacity-0 peer-focus-visible:opacity-100',
  'transition-opacity duration-150',
].join(' ');

export const focusRingRoundedBySize: Record<string, string> = {
  sm: 'rounded-[4px]',
  md: 'rounded-[8px]',
  lg: 'rounded-[8px]',
  xl: 'rounded-[8px]',
};

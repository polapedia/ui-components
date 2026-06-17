import { cn } from '@/utils/cn';
import type { TabIconPosition, TabSize, TabVariant } from '../types';

export const tabSizeClasses: Record<TabSize, string> = {
  sm: 'text-sm', // 14px
  md: 'text-base', // 16px
};

export const getTabClassName = ({
  isActive,
  isDisabled,
  variant,
  size = 'md',
  iconPosition = 'left',
  className,
}: {
  isActive: boolean;
  isDisabled?: boolean;
  variant: TabVariant;
  size?: TabSize;
  iconPosition?: TabIconPosition;
  className?: string;
}) => {
  const isTop = iconPosition === 'top';
  const baseLayout = isTop ? 'flex-col gap-1.5' : 'flex-row gap-2';

  const common = cn(
    'relative flex items-center justify-center font-semibold transition-all whitespace-nowrap select-none focus:outline-none',
    tabSizeClasses[size],
    className
  );
  if (variant === 'underline' || variant === 'underline-full') {
    const isFull = variant === 'underline-full';
    return cn(
      common,
      baseLayout,
      'px-6 py-4 leading-none',
      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:content-[""] after:transition-transform after:duration-200',
      isActive
        ? 'text-red-700 after:scale-x-100 after:bg-red-700'
        : cn(
            'text-zinc-600 hover:text-zinc-800 hover:after:scale-x-100',
            isFull ? 'after:bg-zinc-400/50' : 'after:bg-zinc-300'
          ),
      isDisabled && 'cursor-not-allowed opacity-50',
      'z-10'
    );
  }

  if (variant === 'pills' || variant === 'rectangle') {
    return cn(
      common,
      baseLayout,
      variant === 'pills' ? 'rounded-full' : 'rounded-[8px]',
      'px-6 py-2',
      isActive
        ? 'bg-linear-to-b from-gradient-primary to-gradient-secondary text-white shadow-sm'
        : 'bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800',
      isDisabled && 'opacity-50 cursor-not-allowed grayscale'
    );
  }

  return cn(
    common,
    baseLayout,
    'px-6 py-2 rounded-md flex-1',
    isActive
      ? 'bg-white text-red-700 shadow-sm'
      : 'text-zinc-600 hover:text-zinc-800',
    isDisabled && 'opacity-50 cursor-not-allowed'
  );
};

export const getTabContainerClassName = ({
  variant,
}: {
  variant: TabVariant;
}) => {
  return cn(
    'flex relative',
    variant.includes('underline') && 'w-full sm:w-fit sm:justify-around',
    variant === 'underline-full' &&
      'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-zinc-200 after:content-[""]',
    (variant === 'pills' || variant === 'rectangle') && 'w-fit gap-3 p-1',
    variant === 'contained' && 'bg-zinc-100 p-1 rounded-lg w-full'
  );
};

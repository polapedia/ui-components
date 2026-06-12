import { cn } from '@/utils/cn';
import type { ProgressBarSize } from '../types';

export const progressBarSizeClasses: Record<ProgressBarSize, string> = {
  sm: 'h-[16px]',
  md: 'h-[18px]',
  lg: 'h-[20px]',
};

export const getProgressBarClassName = ({
  size,
  className,
}: {
  size: ProgressBarSize;
  className?: string;
}) => {
  return cn(
    'w-full overflow-hidden rounded-full',
    progressBarSizeClasses[size],
    className
  );
};

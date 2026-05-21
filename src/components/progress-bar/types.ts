import type { ProgressHTMLAttributes } from 'react';

export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  value: number;
  max?: number;
  size?: ProgressBarSize;
  fill?: string;
  className?: string;
}

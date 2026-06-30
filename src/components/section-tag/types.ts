import type { ReactNode } from 'react';

export type SectionTagSize = 'sm' | 'md' | 'lg';
export type SectionTagVariant = 'accent' | 'brand';

export interface SectionTagProps {
  /** Visual size of the tag */
  size?: SectionTagSize;
  /** Color variant - accent (monochrome) or brand (gradient) */
  variant?: SectionTagVariant;
  /** Additional CSS classes */
  className?: string;
  children?: ReactNode;
}

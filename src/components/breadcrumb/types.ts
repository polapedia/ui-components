import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = Readonly<{
  items: BreadcrumbItem[];
  size?: Size;
  separator?: ReactNode;
  className?: string;
}>;

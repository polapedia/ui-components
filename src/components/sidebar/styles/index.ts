import type { SidebarSize } from '../types';

export const sidebarItemClasses = {
  base: 'flex items-center gap-3 rounded-[10px] transition-all duration-200 min-h-[40px] px-3 select-none',
  active: 'bg-red-50 text-primary-600',
  inactive: 'text-black hover:bg-red-50 hover:text-primary-600',
};

export const overlayClasses = {
  base: 'fixed inset-0 z-40 bg-black/20 transition-opacity duration-300',
  panel:
    'fixed top-0 left-0 z-50 h-full overflow-hidden bg-white rounded-r-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out flex',
  topLevelItem: 'min-h-[52px] px-4 py-3 rounded-[12px]',
  childItem: 'min-h-[44px] px-4 py-2 rounded-[10px]',
};

export const collapsibleSizes: Record<
  SidebarSize,
  { expanded: string; collapsed: string }
> = {
  sm: { expanded: 'w-[220px]', collapsed: 'w-[64px]' },
  md: { expanded: 'w-[260px]', collapsed: 'w-[72px]' },
  lg: { expanded: 'w-[300px]', collapsed: 'w-[80px]' },
};

export const hoverSizes: Record<
  SidebarSize,
  { expanded: string; collapsed: string }
> = {
  sm: { expanded: 'hover:w-[240px]', collapsed: 'w-[70px]' },
  md: { expanded: 'hover:w-[280px]', collapsed: 'w-[80px]' },
  lg: { expanded: 'hover:w-[320px]', collapsed: 'w-[90px]' },
};

export const overlaySizes: Record<SidebarSize, string> = {
  sm: 'w-[260px]',
  md: 'w-[288px]',
  lg: 'w-[320px]',
};

export const containerStyles = (sticky: boolean, className?: string) =>
  [
    'w-full flex flex-col items-center px-0 transition-all duration-300 max-w-7xl justify-center mx-auto',
    sticky ? 'sticky top-4 z-50' : 'relative top-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');

export const navStyles = (isElevated: boolean) =>
  [
    'w-full h-[74px] desktop:h-[102px]',
    'px-4 py-2.5',
    'flex items-center justify-between',
    'rounded-2xl',
    'bg-white',
    'transition-all duration-300',
    isElevated
      ? 'shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100'
      : 'border border-slate-200',
  ].join(' ');

export const navItemStyles = (isActive: boolean, isDisabled: boolean) =>
  [
    'relative font-medium transition-colors duration-200',
    'text-[16px] tab:text-[18px]',
    isActive
      ? 'bg-clip-text text-transparent bg-linear-to-b from-gradient-primary to-gradient-secondary'
      : 'text-content-primary hover:text-primary-600',
    isDisabled && 'opacity-50 cursor-not-allowed',
  ]
    .filter(Boolean)
    .join(' ');

export const mobileDrawerStyles = (isOpen: boolean) =>
  [
    'desktop:hidden w-full max-w-6xl overflow-hidden transition-all duration-500 ease-in-out',
    isOpen ? 'max-h-125 opacity-100 mt-4 py-2.5' : 'max-h-0 opacity-0 mt-0',
  ].join(' ');

export const hamburgerIconStyles = (isOpen: boolean) =>
  [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-7 h-7 transition-all duration-200 ease-out',
    isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
  ].join(' ');

export const closeIconStyles = (isOpen: boolean) =>
  [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-5 h-5 transition-all duration-200 ease-out',
    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
  ].join(' ');

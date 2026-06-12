export const rootStyles = (sticky: boolean, className?: string) =>
  [
    'bg-white shadow-[0px_6px_4px_-3px_rgba(0,0,0,0.1)]',
    sticky && 'sticky top-0 z-50',
    className,
  ]
    .filter(Boolean)
    .join(' ');

export const topNavbarStyles =
  'flex justify-between items-center w-full lg:px-16';

export const headerStyles =
  'flex justify-between items-center w-full lg:px-16 lg:h-14';

export const searchContainerStyles = 'relative flex-1 mx-6 tab:mx-12 lg:mx-24';

export const searchBarOverrideStyles =
  'border-[1.5px] border-primary-600 shadow-none';

export const creatorLinkStyles =
  'bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text text-transparent lg:text-[20px] font-exo2 font-medium whitespace-nowrap';

export const kategoriStyles =
  'text-sm lg:text-lg text-content-primary bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text font-medium font-exo2 hover:text-transparent cursor-pointer select-none';

export const iconsContainerStyles = 'flex gap-x-6 items-center';

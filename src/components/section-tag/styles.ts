export const sizeClasses: Record<string, string> = {
  lg: 'h-[58px] px-[20px] py-[12px] text-[24px] font-semibold rounded-full',
  md: 'h-[48px] px-[20px] py-[12px] text-[18px] font-semibold rounded-full',
  sm: 'h-[40px] px-[20px] py-[10px] text-[14px] font-semibold rounded-full',
};

export const variantClasses: Record<string, string> = {
  accent: 'text-content-secondary border border-content-secondary bg-white',
  brand: [
    'bg-clip-text text-transparent',
    'bg-linear-to-b from-gradient-primary to-gradient-secondary',
    'border border-[transparent]',
    '[border-image:linear-gradient(to_bottom,var(--gradient-primary),var(--gradient-secondary))_1]',
    'rounded-full',
    'bg-white',
  ].join(' '),
};

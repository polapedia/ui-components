import { HTMLAttributes, ReactNode } from 'react';

type Variant = 'info' | 'success' | 'warning' | 'danger';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  title?: string;
  description?: string;
  leftIcon?: ReactNode;
}

const baseClasses =
  'flex items-start gap-3 h-[56px] rounded-[16px] px-[12px] py-[8px]';

const variantClasses: Record<Variant, string> = {
  info: 'bg-info-background',
  success: 'bg-success-background',
  warning: 'bg-warning-normal-hover',
  danger: 'bg-error-background',
};

const iconBackgroundClasses: Record<Variant, string> = {
  info: 'bg-accents-blue',
  success: 'bg-accents-green',
  warning: 'bg-accents-brown',
  danger: 'bg-accents-red',
};

export default function Banner({
  variant = 'info',
  className,
  title,
  description,
  leftIcon,
  ...props
}: BannerProps) {
  const classes = [baseClasses, variantClasses[variant], className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {leftIcon && (
        <div
          className={[
            'w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white',
            iconBackgroundClasses[variant],
          ].join(' ')}
        >
          {leftIcon}
        </div>
      )}

      <div className="flex flex-col justify-center leading-tight">
        {title && (
          <div className="text-content-primary text-[14px] font-bold">
            {title}
          </div>
        )}
        {description && (
          <div className="text-content-secondary text-[14px] font-normal">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

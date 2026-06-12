'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type ReactNode,
} from 'react';

type Size = 'sm' | 'md' | 'lg';

type IconAction = {
  icon: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'className' | 'aria-label'
  >;
};

export interface SearchBarProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: Size;
  leftIcon?: IconAction;
  rightIcon?: IconAction;
  containerClassName?: string;
}

const baseClasses = [
  'flex items-center gap-2',
  'bg-white',
  'shadow-lg',
  'p-3',
  'transition-all duration-200 ease-in-out',
  'hover:ring-1 hover:ring-primary-600',
  'focus-within:ring-1 focus-within:ring-primary-600',
].join(' ');

const sizeClasses: Record<Size, string> = {
  sm: 'h-[48px] rounded-[8px]',
  md: 'h-[52px] rounded-[12px]',
  lg: 'h-[56px] rounded-[16px]',
};

const iconWrapperClasses =
  'flex items-center justify-center text-content-secondary shrink-0';

const iconButtonClasses =
  'flex items-center justify-center text-content-secondary shrink-0 cursor-pointer bg-transparent border-0 p-0 outline-none';

const inputClasses = [
  'w-full bg-transparent border-none outline-none',
  'text-[14px] text-content-primary',
  'placeholder:text-content-secondary/60',
  'placeholder:font-medium',
].join(' ');

function renderIcon(iconAction?: IconAction) {
  if (!iconAction) return null;

  const { icon, onClick, ariaLabel, className = '', buttonProps } = iconAction;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? 'icon action'}
        className={`${iconButtonClasses} ${className}`.trim()}
        {...buttonProps}
      >
        {icon}
      </button>
    );
  }

  return (
    <span className={`${iconWrapperClasses} ${className}`.trim()}>{icon}</span>
  );
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      size = 'md',
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const containerClasses = [
      baseClasses,
      sizeClasses[size],
      containerClassName || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {renderIcon(leftIcon)}

        <input
          ref={ref}
          type="text"
          className={[inputClasses, className || ''].filter(Boolean).join(' ')}
          {...props}
        />

        {renderIcon(rightIcon)}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;

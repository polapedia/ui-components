import type { ComponentProps, ReactNode } from 'react';
import SpinnerIcon from '../icons/SpinnerIcon';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'outline-primary';

type Size = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

type Shape = 'rectangle' | 'pill' | 'circle';

type ButtonProps = Readonly<
  ComponentProps<'button'> & {
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }
>;

const baseClasses =
  'inline-flex items-center justify-center font-semibold transition-all disabled:cursor-not-allowed select-none';

const variantClasses: Record<Variant, string> = {
  primary: [
    'text-white bg-linear-to-b from-gradient-primary to-gradient-secondary',
    'hover:from-primary-700 hover:to-primary-700',
    'active:from-primary-900 active:to-primary-900',
  ].join(' '),
  secondary: [
    'bg-white border border-content-secondary text-content-secondary',
    'hover:bg-background-hover hover:text-content-primary',
    'active:bg-background-pressed active:text-content-primary',
  ].join(' '),
  'outline-primary': [
    'border-2 border-transparent',
    'bg-[linear-gradient(theme(colors.white),theme(colors.white)),linear-gradient(to_bottom,theme(colors.gradient-primary),theme(colors.gradient-secondary))]',
    'bg-origin-border [background-clip:padding-box,border-box]',
    'text-content-secondary',
    'hover:bg-background-hover hover:text-content-primary hover:border-primary-700',
    'active:bg-background-pressed active:text-content-primary',
  ].join(' '),
  tertiary: [
    'bg-white',
    'hover:bg-background-hover hover:text-primary-700',
    'active:bg-background-pressed active:text-primary-900',
  ].join(' '),
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 text-[14px] py-1 px-5',
  md: 'h-10 text-[14px] px-3 py-2.5',
  lg: 'h-[58px] text-[24px] px-5 py-3',

  'icon-sm': 'w-8 h-8 p-0',
  'icon-md': 'w-10 h-10 p-0',
  'icon-lg': 'w-14 h-14 p-0',
};

const shapeClasses: Record<Shape, string> = {
  rectangle: '',
  pill: 'rounded-full',
  circle: 'rounded-full p-0 flex items-center justify-center',
};

const compoundClasses = {
  'rectangle-sm': 'rounded-sm',
  'rectangle-md': 'rounded-[8px]',
  'rectangle-lg': 'rounded-[12px]',

  'circle-sm': 'w-[32px] h-[32px] px-0',
  'circle-md': 'w-[48px] h-[48px] px-0',
  'circle-lg': 'w-[56px] h-[56px] px-0',
} as const;

function getSpinnerSize(size: Size) {
  if (size === 'sm') return 'size-4';
  if (size === 'lg') return 'size-6';
  return 'size-5';
}

function getIconColor(variant: Variant) {
  if (variant === 'tertiary')
    return 'text-accents-red hover:text-primary-700 active:text-primary-900';

  if (variant === 'secondary' || variant === 'outline-primary')
    return 'text-content-secondary';

  return 'text-white';
}

function getSpinnerColor(variant: Variant) {
  if (variant === 'tertiary') return 'text-accents-red';

  if (variant === 'secondary' || variant === 'outline-primary')
    return 'text-content-secondary';

  return 'text-white';
}

export default function Button(props: Readonly<ButtonProps>) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rectangle',
    isLoading,
    className,
    children,
    leftIcon,
    rightIcon,
    disabled,
    ...restProps
  } = props;
  const isDisabled = disabled || isLoading;
  const isIconOnly = size.startsWith('icon-') || shape === 'circle';
  const key = `${shape}-${size}` as keyof typeof compoundClasses;

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    compoundClasses[key],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconColorClass = getIconColor(variant);
  const spinnerColorClass = getSpinnerColor(variant);
  const spinnerSizeClass = getSpinnerSize(size);

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classes}
      {...restProps}
    >
      {isLoading && (
        <SpinnerIcon
          className={['animate-spin', spinnerSizeClass, spinnerColorClass]
            .filter(Boolean)
            .join(' ')}
        />
      )}

      {!isLoading && (
        <>
          {isIconOnly ? (
            leftIcon && <span className="inline-flex">{leftIcon}</span>
          ) : (
            <>
              {leftIcon && (
                <span className={`inline-flex mr-4.5 ${iconColorClass}`}>
                  {leftIcon}
                </span>
              )}
              <span
                className={
                  variant === 'tertiary'
                    ? 'bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text text-transparent'
                    : ''
                }
              >
                {children}
              </span>
              {rightIcon && (
                <span className={`inline-flex ml-4.5 ${iconColorClass}`}>
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </>
      )}
    </button>
  );
}

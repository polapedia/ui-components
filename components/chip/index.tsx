import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

type Size = 'xs' | 'sm' | 'md';
type ChipVariant = 'default' | 'avatar' | 'icon-left' | 'icon-right';

export interface ChipProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'size'
> {
  size?: Size;
  variant?: ChipVariant;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type IconWithClassNameProps = { className?: string };

const iconSizeClasses: Record<Size, string> = {
  xs: 'w-[10px] h-[10px]',
  sm: 'w-[12px] h-[12px]',
  md: 'w-[14px] h-[14px]',
};

function renderSizedIcon(icon: ReactNode, size: Size): ReactNode {
  if (!icon) return null;
  if (!isValidElement(icon)) return icon;

  const element = icon as ReactElement<IconWithClassNameProps>;
  const existingClassName = element.props.className ?? '';

  return cloneElement<IconWithClassNameProps>(element, {
    className: `${iconSizeClasses[size]} ${existingClassName}`.trim(),
  });
}

export default function Chip(props: ChipProps) {
  const {
    className,
    size = 'sm',
    variant = 'default',
    leftIcon,
    rightIcon,
    onClick,
    children,
    disabled,
    ...buttonProps
  } = props;

  const isDisabled = !!disabled;

  const baseClasses = [
    'inline-flex items-center justify-center',
    'rounded-full border select-none',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
  ].join(' ');

  const enabledStateClasses = [
    'bg-white text-gray-800 border-gray-300',
    'hover:bg-gray-100 hover:border-gray-400',
    'active:bg-linear-to-b active:from-gradient-primary active:to-gradient-secondary active:border-primary-600 active:text-white',
  ].join(' ');

  const disabledStateClasses = [
    'bg-background-disabled text-content-secondary border-gray-200',
    'cursor-not-allowed',
  ].join(' ');

  const sizeClasses: Record<Size, string> = {
    xs: 'h-[28px] px-[12px] text-[11px]',
    sm: 'h-[32px] px-[12px] text-xs',
    md: 'h-[44px] px-[13px] text-sm',
  };

  const gapClassesByVariant: Record<ChipVariant, string> = {
    default: 'gap-x-[12px]',
    'icon-left': 'gap-x-[12px]',
    'icon-right': 'gap-x-[12px]',
    avatar: 'gap-x-[8px]',
  };

  const avatarWrapperClasses: Record<Size, string> = {
    xs: 'w-[24px] h-[24px] text-[10px]',
    sm: 'w-[24px] h-[24px] text-[11px]',
    md: 'w-[36px] h-[36px] text-xs',
  };

  const labelClasses = 'truncate font-medium leading-none';

  const classes = [
    baseClasses,
    sizeClasses[size],
    gapClassesByVariant[variant],
    isDisabled ? disabledStateClasses : enabledStateClasses,
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  // render helpers
  const renderLeftContent = () => {
    if (!leftIcon) return null;

    if (variant === 'avatar') {
      return (
        <span
          className={[
            'inline-flex shrink-0 items-center justify-center rounded-full',
            'bg-secondary-400 text-gray-800 active:text-white -ml-2.5',
            avatarWrapperClasses[size],
          ].join(' ')}
        >
          {leftIcon}
        </span>
      );
    }

    if (variant === 'icon-left' || variant === 'default') {
      return (
        <span className="inline-flex shrink-0 items-center justify-center active:text-white">
          {renderSizedIcon(leftIcon, size)}
        </span>
      );
    }

    return null;
  };

  const renderRightContent = () => {
    if (!(variant === 'icon-right' || variant === 'default') || !rightIcon) {
      return null;
    }

    return (
      <span className="inline-flex shrink-0 items-center justify-center active:text-white">
        {renderSizedIcon(rightIcon, size)}
      </span>
    );
  };

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      disabled={isDisabled}
      className={classes}
      onClick={handleClick}
    >
      {renderLeftContent()}
      <span className={labelClasses}>{children}</span>
      {renderRightContent()}
    </button>
  );
}

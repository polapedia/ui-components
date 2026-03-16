import type { ComponentProps, ReactNode } from 'react';

export interface ListItemProps extends ComponentProps<'button'> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
  description?: string;
  isSelected?: boolean;
}

const baseClasses =
  'w-full flex items-center justify-between p-2 text-left select-none transition-colors rounded-[8px] hover:bg-background-hover active:bg-background-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/40 disabled:cursor-not-allowed disabled:opacity-50';

const selectedClasses = 'bg-background-hover';

const iconClasses = 'inline-flex shrink-0 [&_svg]:size-6';

export function ListItem(props: Readonly<ListItemProps>) {
  const {
    leftIcon,
    rightIcon,
    title,
    description,
    isSelected,
    className,
    disabled,
    ...rest
  } = props;

  const classes = [
    baseClasses,
    isSelected ? selectedClasses : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...rest}>
      <div className="flex items-center min-w-0">
        {leftIcon && <span className={iconClasses}>{leftIcon}</span>}

        <div className={`${leftIcon ? 'ml-2.5' : 'ml-1'} min-w-0`}>
          <div className="text-[16px] font-semibold text-black truncate">
            {title}
          </div>

          {description && (
            <div className="text-[14px] font-normal text-content-secondary truncate">
              {description}
            </div>
          )}
        </div>
      </div>

      {rightIcon && <span className={iconClasses}>{rightIcon}</span>}
    </button>
  );
}

export interface ListProps extends ComponentProps<'div'> {
  divided?: boolean;
}

export function List(props: Readonly<ListProps>) {
  const { divided = true, className, ...rest } = props;
  const classes = [
    'flex flex-col',
    divided ? 'divide-y divide-content-secondary/20' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...rest} />;
}

import { cn } from '../../../utils/cn';
import { baseClasses, colorClasses, sizeClasses } from '../styles';
import type { BadgeProps } from '../types';

export default function DefaultBadge(props: Readonly<BadgeProps>) {
  const {
    className,
    variant = 'primary',
    size = 'm',
    color = 'red',
    children,
    leftIcon,
    rightIcon,
    ...restProps
  } = props;

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    colorClasses[color][variant],
    className
  );

  return (
    <div className={classes} {...restProps}>
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </div>
  );
}

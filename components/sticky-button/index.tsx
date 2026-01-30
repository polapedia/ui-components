import { ComponentProps } from 'react';
import Button from '../button';

type ButtonProps = ComponentProps<typeof Button>;

interface StickyButtonProps extends ButtonProps {
  sticky?: boolean;
  containerClassName?: string;
}

export default function StickyButton({
  sticky = true,
  containerClassName,
  className,
  variant = 'primary',
  size = 'md',
  shape = 'rectangle',
  ...props
}: StickyButtonProps) {
  const outerClasses = [
    sticky ? 'sticky bottom-0 left-0 right-0 z-30' : '',
    'px-4 pb-6 pt-3',
    'bg-linear-to-b from-white via-white/80 to-transparent',
    'flex justify-center',
    containerClassName || '',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedShape =
    shape ?? (variant === 'tertiary' ? 'rectangle' : 'pill');

  const buttonClasses = [
    'w-full',
    variant === 'tertiary' ? 'bg-transparent shadow-none px-0' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={outerClasses}>
      <Button
        {...props}
        variant={variant}
        size={size}
        shape={resolvedShape}
        className={buttonClasses}
      />
    </div>
  );
}

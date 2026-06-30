import { cn } from '../../utils/cn';
import { sizeClasses } from './styles';
import type { SectionTagProps } from './types';

export function SectionTag({
  children,
  size = 'md',
  variant = 'accent',
  className,
}: Readonly<SectionTagProps>) {
  if (variant === 'brand') {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 rounded-full p-[1.5px]',
          'bg-linear-to-b from-gradient-primary to-gradient-secondary',
          className
        )}
      >
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-white',
            sizeClasses[size]
          )}
        >
          <span className="bg-clip-text text-transparent bg-linear-to-b from-gradient-primary to-gradient-secondary">
            {children}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'border border-content-secondary text-content-secondary bg-white',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default SectionTag;

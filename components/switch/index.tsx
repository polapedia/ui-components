import { ComponentProps, forwardRef, useId } from 'react';

type Size = 'sm' | 'md';
type State = 'default' | 'error';
type LabelPosition = 'left' | 'right';

export interface SwitchProps extends Omit<
  ComponentProps<'input'>,
  'size' | 'type'
> {
  size?: Size;
  label?: string;
  labelPosition?: LabelPosition;
  state?: State;
}

const containerSizeClasses: Record<Size, string> = {
  md: 'h-6 w-11 p-0.5',
  sm: 'h-5 w-9 p-0.5',
};

const thumbSizeClasses: Record<Size, string> = {
  md: 'size-5',
  sm: 'size-4',
};

const thumbTranslateClasses: Record<Size, string> = {
  md: 'group-has-checked:translate-x-5',
  sm: 'group-has-checked:translate-x-4',
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      label,
      labelPosition = 'left',
      state = 'default',
      id,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const isDisabled = !!disabled;
    const isError = state === 'error';

    let containerColorClasses = '';
    if (isDisabled) {
      containerColorClasses = `
        bg-neutral-200
        inset-ring inset-ring-gray-900/5
        dark:bg-gray-800/50 dark:inset-ring-white/10
      `;
    } else if (isError) {
      containerColorClasses = `
        bg-neutral-200 has-checked:bg-accents-red
        inset-ring inset-ring-gray-900/5
        dark:bg-gray-800/50 dark:inset-ring-white/10
      `;
    } else {
      containerColorClasses = `
        bg-neutral-200 has-checked:bg-accents-blue
        inset-ring inset-ring-gray-900/5
        dark:bg-gray-800/50 dark:inset-ring-white/10
      `;
    }

    const labelClasses = `
      text-sm font-medium select-none
      ${isDisabled ? 'text-gray-400' : 'text-gray-900'}
      ${isError ? 'text-accents-red' : ''}
    `;

    return (
      <label
        htmlFor={inputId}
        className={`
          inline-flex items-center gap-2
          ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${className || ''}
        `}
      >
        {/* Left Label */}
        {label && labelPosition === 'left' && (
          <span className={labelClasses}>{label}</span>
        )}

        {/* Switch Core */}
        <div
          className={`
            group relative inline-flex shrink-0 items-center rounded-full
            outline-offset-2 has-focus-visible:outline-2 focus-within:outline-primary-600
            transition-colors duration-200 ease-in-out
            cursor-inherit
            ${containerSizeClasses[size]}
            ${containerColorClasses}
          `}
        >
          {/* Thumb */}
          <span
            className={`
              inline-block translate-x-0 rounded-full bg-white
              shadow-xs ring-1 ring-gray-900/5
              transition-transform duration-200 ease-in-out
              ${thumbSizeClasses[size]}
              ${thumbTranslateClasses[size]}
              dark:shadow-none
            `}
          />

          {/* Input Native */}
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            aria-label={label || 'Switch'}
            disabled={isDisabled}
            className={`absolute inset-0 appearance-none focus:outline-hidden ${
              isDisabled ? 'cursor-not-allowed' : ''
            }`}
            {...props}
          />
        </div>

        {/* Right Label */}
        {label && labelPosition === 'right' && (
          <span className={labelClasses}>{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;

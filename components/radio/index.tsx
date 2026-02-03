import { ComponentProps, forwardRef, useId } from 'react';

type Size = 'sm' | 'md';
type State = 'default' | 'error';

export interface RadioProps extends Omit<
  ComponentProps<'input'>,
  'size' | 'type'
> {
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
}

const wrapperClasses = 'group flex items-start gap-[4px] w-full relative';

const inputSizeClasses: Record<Size, string> = {
  sm: 'h-4 w-4 rounded-full',
  md: 'h-5 w-5 rounded-full',
};

const labelSizeClasses: Record<Size, string> = {
  sm: 'text-xs leading-4',
  md: 'text-sm leading-5',
};

const innerDotSizeClasses: Record<Size, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = 'md',
      state = 'default',
      className,
      disabled,
      required,
      helperText,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const isError = state === 'error';
    const isDisabled = disabled;

    // Border
    let inputStateClasses = '';
    if (isDisabled) {
      // default & disabled (including selected)
      inputStateClasses = `
        bg-white border-gray-300
        checked:border-neutral-400
        cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-300
      `;
    } else if (isError) {
      // default & error
      inputStateClasses = `
        bg-white border-accents-red
        checked:border-accents-red
        hover:bg-red-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accents-red
      `;
    } else {
      // default / default & selected
      inputStateClasses = `
        bg-white border-gray-300
        hover:border-accents-blue hover:bg-gray-50
        checked:border-accents-blue
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accents-blue
      `;
    }

    // FILL (dot inside)
    let innerDotStateClasses = '';
    if (isDisabled) {
      innerDotStateClasses = 'bg-neutral-400'; // selected & disabled
    } else if (isError) {
      innerDotStateClasses = 'bg-accents-red'; // error
    } else {
      innerDotStateClasses = 'bg-accents-blue'; // selected normal
    }

    return (
      <div className={`${wrapperClasses} ${className || ''}`}>
        {/* Wrapper Radio */}
        <div className={`flex items-center justify-center shrink-0`}>
          <div className="relative flex items-center">
            <div className="grid place-items-center">
              {/* Input Radio */}
              <input
                ref={ref}
                type="radio"
                id={inputId}
                disabled={isDisabled}
                required={required}
                aria-describedby={helperId}
                className={`
                  peer col-start-1 row-start-1 appearance-none border-2 shrink-0
                  transition-all duration-200 ease-in-out
                  ${inputSizeClasses[size]}
                  ${inputStateClasses}
                `}
                {...props}
              />

              {/* Inner Dot */}
              <span
                className={`
                  pointer-events-none col-start-1 row-start-1 rounded-full
                  ${innerDotSizeClasses[size]}
                  opacity-0 peer-checked:opacity-100
                  transition-opacity duration-200
                  ${innerDotStateClasses}
                `}
              />
            </div>
          </div>
        </div>

        {/* Label & helper */}
        <div className="flex flex-col select-none pt-0">
          {label && (
            <label
              htmlFor={inputId}
              className={`
                font-medium transition-colors
                ${labelSizeClasses[size]}
                ${
                  isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-900 cursor-pointer'
                }
                ${isError ? 'text-accents-red' : ''}
              `}
            >
              {label}
              {required && <span className="text-accents-red ml-0.5">*</span>}
            </label>
          )}

          {helperText && (
            <p
              id={helperId}
              className={`mt-1 text-[11px] leading-tight ${
                isError
                  ? 'text-accents-red'
                  : isDisabled
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;

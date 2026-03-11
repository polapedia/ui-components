import { type ComponentProps, type ReactNode, forwardRef, useId } from 'react';
import AlertIcon from '../icons/AlertIcon';
import CheckIcon from '../icons/CheckIcon';
import CloseIcon from '../icons/CloseIcon';

type Size = 'sm' | 'md';

type State = 'default' | 'error' | 'success';

type Variant = 'rounded' | 'compact';

interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: Size;
  state?: State;
  variant?: Variant;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isClearable?: boolean;
  onClear?: () => void;
  helperText?: string;
}

const baseWrapperClasses =
  'relative flex items-center w-full transition-all hover:bg-background-hover border rounded-[8px] overflow-hidden focus-within:ring-[1px] focus-within:ring-offset-0';

const sizeClasses: Record<Size, string> = {
  sm: 'h-[48px] text-[14px] px-4',
  md: 'h-[52px] text-[14px] px-4',
};

const variantClasses: Record<Variant, string> = {
  compact: 'rounded-[8px]',
  rounded: 'rounded-[50px]',
};

const stateClasses: Record<State, string> = {
  default:
    'border-content-secondary text-content-primary bg-white focus-within:border-primary-500 focus-within:ring-primary-600 focus-within:border-0 placeholder:text-content-secondary',
  error:
    'border-accents-red text-accents-red bg-white focus-within:ring-red-100 placeholder:text-accents-red/50',
  success:
    'border-success-icon-color text-success-dark bg-white focus-within:ring-green-100 placeholder:text-green-700/50',
};

const disabledClasses =
  'text-content-secondary bg-neutral-300 border-gray-200 cursor-not-allowed select-none';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      variant = 'compact',
      className,
      leftIcon,
      rightIcon,
      isClearable,
      onClear,
      disabled,
      required,
      placeholder,
      helperText,
      value,
      label,
      ...props
    },
    ref
  ) => {
    const isError = state === 'error';
    const isSuccess = state === 'success';
    const isDisabled = disabled;
    const id = useId();

    const wrapperClasses = [
      baseWrapperClasses,
      sizeClasses[size],
      variantClasses[variant],
      isDisabled ? disabledClasses : stateClasses[state],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    let renderedRightIcon = rightIcon;

    if (isError) {
      renderedRightIcon = (
        <AlertIcon className="text-accents-red w-4.5 h-4.5 my-auto" />
      );
    } else if (isSuccess) {
      renderedRightIcon = (
        <CheckIcon className="text-green-500 w-5 h-5 my-auto" />
      );
    } else if (isClearable && value && !isDisabled) {
      renderedRightIcon = (
        <button
          type="button"
          onClick={onClear}
          className="text-content-secondary hover:text-content-primary focus:outline-none"
        >
          <CloseIcon className="bg-neutral-200 w-5 h-5 rounded-full p-1" />
        </button>
      );
    }

    const fakePlaceholderLeft = leftIcon ? 'left-[48px]' : 'left-4';

    let helperTextColor = 'text-content-secondary';

    if (isError) {
      helperTextColor = 'text-error-icon-color';
    } else if (isSuccess) {
      helperTextColor = 'text-green-600';
    }

    return (
      <div className="w-full flex flex-col">
        {label && (
          <label htmlFor={id} className="text-[14px] text-content-primary">
            {label}
            {required && <span className="text-accents-red ml-0.5">*</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          {leftIcon && (
            <span
              className={`inline-flex w-6 h-6 mr-2 my-auto ${
                isDisabled ? 'text-gray-400' : 'text-content-secondary'
              }`}
            >
              {leftIcon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            disabled={isDisabled}
            required={required}
            value={value}
            placeholder=" "
            aria-label={label || placeholder || 'input'}
            className="peer w-full h-full bg-transparent border-none outline-none p-0 placeholder:text-[14px] placeholder:text-content-secondary disabled:cursor-not-allowed text-[14px] text-black"
            {...props}
          />

          {placeholder && (
            <span
              className={`pointer-events-none absolute ${fakePlaceholderLeft} top-1/2 -translate-y-1/2 text-[14px] text-content-secondary peer-focus:hidden peer-not-placeholder-shown:hidden`}
            >
              {placeholder}
              {required && <span className="text-accents-red ml-px">*</span>}
            </span>
          )}

          {renderedRightIcon && (
            <span className="inline-flex shrink-0 w-6 h-6 ml-2 my-auto">
              {renderedRightIcon}
            </span>
          )}
        </div>

        {helperText && (
          <p className={`text-[12px] ${helperTextColor}`}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

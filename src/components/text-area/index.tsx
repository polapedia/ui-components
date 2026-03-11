import React, {
  forwardRef,
  type ComponentProps,
  type ReactNode,
  useState,
} from 'react';
import AlertIcon from '../icons/AlertIcon';
import CheckIcon from '../icons/CheckIcon';

type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'error' | 'success';

interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'size'> {
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
  rightIcon?: ReactNode;
}

const baseWrapperClasses =
  'relative flex flex-col w-full transition-all border rounded-[8px] overflow-hidden';

const sizeClasses: Record<Size, string> = {
  sm: 'h-[120px]',
  md: 'h-[150px]',
  lg: 'h-[200px]',
};

const focusRingClasses =
  'focus-within:ring-[1px] focus-within:ring-offset-0 focus-within:ring-primary-600';

const stateClasses: Record<State, string> = {
  default: `border-0 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-primary-600 focus-within:border-0`,
  error: `border-0 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-red-500`,
  success: `border-0 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-green-500`,
};

const disabledClasses =
  'bg-neutral-300 border-0 cursor-not-allowed select-none';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = 'md',
      state = 'default',
      className,
      disabled,
      required,
      placeholder,
      helperText,
      value,
      label,
      rightIcon,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');

    const effectiveValue = typeof value === 'string' ? value : internalValue;

    const charCount = effectiveValue.length;
    const isOverLimit = charCount > 500;

    const currentState: State = isOverLimit ? 'error' : state;

    const isError = currentState === 'error';
    const isSuccess = currentState === 'success';
    const isDisabled = Boolean(disabled);

    const wrapperClasses = [
      baseWrapperClasses,
      sizeClasses[size],
      isDisabled ? disabledClasses : stateClasses[currentState],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const getLabelColor = (isDisabled: boolean, isError: boolean) => {
      if (isDisabled) return 'text-content-secondary';
      if (isError) return 'text-accents-red';
      return 'text-content-secondary';
    };

    const getCounterColor = (isDisabled: boolean, isOverLimit: boolean) => {
      if (isDisabled) return 'text-content-secondary';
      if (isOverLimit) return 'text-accents-red font-bold';
      return 'text-content-secondary';
    };

    const getRightIcon = (
      isError: boolean,
      isSuccess: boolean,
      rightIcon?: ReactNode
    ) => {
      if (isError) {
        return <AlertIcon className="text-red-500 w-5 h-5" />;
      }

      if (isSuccess) {
        return <CheckIcon className="text-green-500 w-5 h-5" />;
      }

      return rightIcon;
    };

    function getHelperTextColor(isError: boolean, isSuccess: boolean) {
      if (isError) return 'text-red-500';
      if (isSuccess) return 'text-green-600';
      return 'text-gray-500';
    }

    const renderedRightIcon = getRightIcon(isError, isSuccess, rightIcon);
    const labelColor = getLabelColor(isDisabled, isError);
    const counterColor = getCounterColor(isDisabled, isOverLimit);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (typeof value !== 'string') {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div
        className={`w-full flex flex-col gap-1.5 font-sans ${sizeClasses[size]}`}
      >
        <div className={wrapperClasses}>
          <div
            className={`flex items-center px-4 pt-2 shrink-0 ${
              renderedRightIcon ? 'justify-between' : 'justify-center'
            }`}
          >
            {label ? (
              <label
                className={`text-[14px] font-medium transition-colors ${labelColor}`}
              >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            ) : (
              <div />
            )}
            {renderedRightIcon && (
              <div
                className={`shrink-0 ml-2 ${isDisabled ? 'opacity-50' : ''}`}
              >
                {renderedRightIcon}
              </div>
            )}
          </div>

          <textarea
            ref={ref}
            disabled={isDisabled}
            required={required}
            value={effectiveValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={`
              flex-1 w-full bg-transparent border-none outline-none 
              px-4 py-2 resize-none text-[14px] placeholder:text-gray-400/70
              disabled:cursor-not-allowed
              ${isDisabled ? 'text-content-secondary' : 'text-black'}
              ${sizeClasses[size]}
            `}
            {...props}
          />

          <div className="flex justify-end px-4 pb-2 shrink-0">
            <span className={` text-[14px] transition-colors ${counterColor}`}>
              {charCount}/500
            </span>
          </div>
        </div>

        {helperText && (
          <p
            className={`text-[12px] ${getHelperTextColor(isError, isSuccess)}`}
          >
            {isOverLimit ? 'Character limit exceeded' : helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

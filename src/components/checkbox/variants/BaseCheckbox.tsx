import { cn } from '../../../utils/cn';
import {
  inputSizeClasses,
  checkmarkSizeClasses,
  baseInputClasses,
  baseIconClasses,
  baseFocusRingClasses,
  focusRingBySize,
  focusRingRoundedBySize,
} from '../styles/checkbox';
import CheckmarkIcon from '../../icons/CheckmarkIcon';
import MinusIcon from '../../icons/MinusIcon';

export interface SharedCheckboxInputProps {
  size: string;
  isDisabled: boolean;
  isError: boolean;
  isActive: boolean;
  indeterminate: boolean;
  inputProps: React.ComponentProps<'input'>;
  inputRef: React.Ref<HTMLInputElement>;
  inputId: string;
  helperId?: string;
  required?: boolean;
}

interface BaseCheckboxProps extends SharedCheckboxInputProps {
  focusRingColor: string;
  children?: React.ReactNode;
}

export function BaseCheckbox({
  size,
  isDisabled,
  isError,
  indeterminate,
  inputProps,
  inputRef,
  inputId,
  helperId,
  required,
  focusRingColor,
  children,
}: BaseCheckboxProps) {
  return (
    <div className="grid place-items-center group/cb">
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        disabled={isDisabled}
        required={required}
        aria-invalid={isError}
        aria-describedby={helperId}
        className={cn(
          baseInputClasses,
          inputSizeClasses[size],
          isDisabled &&
            `
            bg-background-disabled border-background-disabled cursor-not-allowed
            checked:bg-background-disabled checked:border-background-disabled
          `,
          isError &&
            `
            bg-white border-accents-red
            hover:border-accents-red
            checked:border-accents-red
          `,
          !isDisabled &&
            !isError &&
            `
            bg-white border-black
            checked:border-transparent
          `
        )}
        {...inputProps}
      />

      {!isDisabled && (
        <div
          className={cn(
            baseFocusRingClasses,
            focusRingBySize[size],
            focusRingRoundedBySize[size],
            isError ? 'ring-accents-red' : focusRingColor
          )}
        />
      )}

      {children}

      {indeterminate ? (
        <MinusIcon
          className={cn(
            baseIconClasses,
            checkmarkSizeClasses[size],
            'text-white'
          )}
        />
      ) : (
        <CheckmarkIcon
          className={cn(
            baseIconClasses,
            checkmarkSizeClasses[size],
            'stroke-white',
            'opacity-0 peer-checked:opacity-100'
          )}
        />
      )}
    </div>
  );
}

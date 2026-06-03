import { cn } from '../../../utils/cn';
import {
  inputSizeClasses,
  checkmarkSizeClasses,
  baseInputClasses,
  baseOverlayClasses,
  baseIconClasses,
  baseFocusRingClasses,
  focusRingBySize,
  focusRingRoundedBySize,
} from '../styles/checkbox';
import CheckmarkIcon from '../../icons/CheckmarkIcon';
import MinusIcon from '../../icons/MinusIcon';

interface PrimaryCheckboxInputProps {
  size: string;
  isDisabled: boolean;
  isError: boolean;
  isActive: boolean;
  indeterminate: boolean;
  inputProps: React.ComponentProps<'input'>;
  inputRef: React.RefObject<HTMLInputElement>;
  inputId: string;
  helperId?: string;
  required?: boolean;
}

export function PrimaryCheckboxInput({
  size,
  isDisabled,
  isError,
  isActive,
  indeterminate,
  inputProps,
  inputRef,
  inputId,
  helperId,
  required,
}: PrimaryCheckboxInputProps) {
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
            isError ? 'ring-accents-red' : 'ring-primary-700'
          )}
        />
      )}

      {!isDisabled && !isError && (
        <div
          className={cn(
            baseOverlayClasses,
            inputSizeClasses[size],
            'bg-gradient-to-b from-gradient-primary to-gradient-secondary',
            isActive
              ? 'opacity-100 group-hover/cb:opacity-0 group-active/cb:opacity-0'
              : 'opacity-0 peer-checked:opacity-100 peer-checked:group-hover/cb:opacity-0 peer-checked:group-active/cb:opacity-0'
          )}
        />
      )}

      {!isDisabled && !isError && (
        <div
          className={cn(
            baseOverlayClasses,
            inputSizeClasses[size],
            'bg-primary-700',
            isActive
              ? 'opacity-0 group-hover/cb:opacity-100 group-active/cb:opacity-0'
              : 'opacity-0 peer-checked:group-hover/cb:opacity-100 peer-checked:group-active/cb:opacity-0'
          )}
        />
      )}

      {!isDisabled && !isError && (
        <div
          className={cn(
            baseOverlayClasses,
            inputSizeClasses[size],
            'bg-primary-800',
            isActive
              ? 'opacity-0 group-active/cb:opacity-100'
              : 'opacity-0 peer-checked:group-active/cb:opacity-100'
          )}
        />
      )}

      {!isDisabled && isError && (
        <div
          className={cn(
            baseOverlayClasses,
            inputSizeClasses[size],
            'bg-accents-red',
            isActive ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100'
          )}
        />
      )}

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

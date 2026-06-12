import { cn } from '../../../utils/cn';
import {
  radioSizeClasses,
  innerDotSizeClasses,
  rippleSizeClasses,
  borderWeightClasses,
} from '../styles/radio';

interface PrimaryRadioInputProps {
  size: string;
  isDisabled: boolean;
  isError: boolean;
  inputProps: React.ComponentProps<'input'>;
  inputRef: React.RefObject<HTMLInputElement>;
  inputId: string;
  helperId?: string;
  required?: boolean;
}

export function PrimaryRadioInput({
  size,
  isDisabled,
  isError,
  inputProps,
  inputRef,
  inputId,
  helperId,
  required,
}: Readonly<PrimaryRadioInputProps>) {
  const getCircleColors = () => {
    if (isDisabled) return 'border-gray-300 bg-white';

    if (isError) {
      return cn(
        'border-accents-red bg-white',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-accents-red peer-focus-visible:ring-offset-4'
      );
    }

    return cn(
      'border-black bg-white transition-all duration-200',
      'group-hover/radio:border-primary-700',
      'peer-checked:border-primary-700',

      'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-4',
      'peer-focus-visible:ring-black',
      'peer-focus-visible:peer-checked:ring-primary-700'
    );
  };

  const getDotColors = () => {
    if (isDisabled) return 'bg-gray-300';
    if (isError) return 'bg-accents-red';
    return cn(
      'bg-gradient-to-b from-gradient-primary to-gradient-secondary',
      'group-hover/radio:from-primary-700 group-hover/radio:to-primary-700'
    );
  };

  return (
    <div className="relative flex items-center justify-center shrink-0 group/radio">
      {/* Ripple Effect */}
      <div
        className={cn(
          'absolute rounded-full bg-gray-100 opacity-0 group-active/radio:opacity-100 transition-opacity duration-150 pointer-events-none',
          rippleSizeClasses[size]
        )}
      />

      <div
        className={cn(
          'relative flex items-center justify-center',
          radioSizeClasses[size]
        )}
      >
        {/* Native Hidden Input */}
        <input
          ref={inputRef}
          type="radio"
          id={inputId}
          disabled={isDisabled}
          required={required}
          aria-describedby={helperId}
          className="peer absolute inset-0 opacity-0 z-20 cursor-pointer disabled:cursor-not-allowed"
          {...inputProps}
        />

        {/* Outer Circle Visual */}
        <div
          className={cn(
            'absolute inset-0 rounded-full transition-all duration-200 z-10',
            borderWeightClasses[size],
            getCircleColors()
          )}
        />

        {/* Inner Dot */}
        <span
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block z-10',
            'pointer-events-none rounded-full transition-all duration-200 scale-0 peer-checked:scale-100',
            innerDotSizeClasses[size],
            getDotColors()
          )}
        />
      </div>
    </div>
  );
}

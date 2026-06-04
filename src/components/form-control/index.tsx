import { cn } from '../../utils/cn';
import { getHelperTextColor, getLabelTextColor } from './utils';

interface FormLabelProps {
  htmlFor: string;
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  sizeClass?: string;
  className?: string;
  variant?: 'checkbox' | 'radio' | 'input';
}

export function FormLabel({
  htmlFor,
  label,
  required,
  isDisabled,
  isError,
  isSuccess,
  sizeClass,
  className,
  variant = 'checkbox',
}: FormLabelProps) {
  if (!label) return null;

  const labelTextColor = getLabelTextColor(
    !!isError,
    !!isDisabled,
    variant,
    !!isSuccess
  );

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'transition-colors cursor-pointer',
        sizeClass,
        isDisabled && 'cursor-not-allowed',
        className,
        labelTextColor
      )}
    >
      {label}
      {required && <span className="text-accents-red ml-0.5">*</span>}
    </label>
  );
}

interface FormHelperTextProps {
  id?: string;
  text?: string;
  isDisabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  className?: string;
}

export function FormHelperText({
  id,
  text,
  isDisabled,
  isError,
  isSuccess,
  className,
}: FormHelperTextProps) {
  if (!text) return null;

  const helperTextColor = getHelperTextColor(
    !!isError,
    !!isDisabled,
    !!isSuccess
  );

  return (
    <p
      id={id}
      className={cn('text-[11px] leading-tight', helperTextColor, className)}
    >
      {text}
    </p>
  );
}

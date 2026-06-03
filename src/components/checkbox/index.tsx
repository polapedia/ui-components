import { forwardRef, useRef, useEffect } from 'react';
import type { CheckboxProps } from './types';
import { useFormControl } from '../form-control/useFormControl';
import { FormLabel, FormHelperText } from '../form-control';
import { cn } from '../../utils/cn';
import { FORM_CONTROL_WRAPPER_CLASSES } from '../form-control/utils';
import { PrimaryCheckboxInput } from './variants/PrimaryCheckbox';
import { SecondaryCheckboxInput } from './variants/SecondaryCheckbox';
import { labelSizeClasses } from './styles/checkbox';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      state = 'default',
      variant = 'primary',
      indeterminate = false,
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
    const { inputId, helperId, isError, isDisabled } = useFormControl({
      id,
      disabled,
      state,
      helperText,
    });

    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef =
      (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const isActive =
      !!(props.checked ?? props.defaultChecked ?? false) || indeterminate;

    const sharedInputProps = {
      size,
      isDisabled,
      isError,
      isActive,
      indeterminate,
      inputProps: props,
      inputRef: resolvedRef,
      inputId,
      helperId,
      required,
    };

    return (
      <div className={cn(FORM_CONTROL_WRAPPER_CLASSES, className)}>
        <div className="flex items-center justify-center shrink-0">
          <div className="relative flex items-center">
            {variant === 'primary' ? (
              <PrimaryCheckboxInput {...sharedInputProps} />
            ) : (
              <SecondaryCheckboxInput {...sharedInputProps} />
            )}
          </div>
        </div>

        <div className="flex flex-col select-none pt-0">
          <FormLabel
            htmlFor={inputId}
            label={label}
            required={required}
            isDisabled={isDisabled}
            isError={isError}
            sizeClass={labelSizeClasses[size]}
          />

          <FormHelperText
            id={helperId}
            text={helperText}
            isDisabled={isDisabled}
            isError={isError}
            className="mt-1"
          />
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

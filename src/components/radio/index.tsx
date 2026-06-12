import { forwardRef, useRef } from 'react';
import type { RadioProps } from './types';
import { useFormControl } from '../form-control/useFormControl';
import { FormLabel, FormHelperText } from '../form-control';
import { cn } from '../../utils/cn';
import { FORM_CONTROL_WRAPPER_CLASSES } from '../form-control/utils';
import { PrimaryRadioInput } from './variants/PrimaryRadio';
import { labelSizeClasses } from './styles/radio';

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
    const { inputId, helperId, isError, isDisabled } = useFormControl({
      id,
      disabled,
      state,
      helperText,
    });

    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef =
      (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    const sharedInputProps = {
      size,
      isDisabled,
      isError,
      inputProps: props,
      inputRef: resolvedRef,
      inputId,
      helperId,
      required,
    };

    return (
      <div
        className={cn(FORM_CONTROL_WRAPPER_CLASSES, 'items-center', className)}
      >
        <PrimaryRadioInput {...sharedInputProps} />

        <div className="flex flex-col select-none ml-3">
          <FormLabel
            htmlFor={inputId}
            label={label}
            required={required}
            isDisabled={isDisabled}
            isError={isError}
            sizeClass={labelSizeClasses[size]}
            variant="radio"
          />

          <FormHelperText
            id={helperId}
            text={helperText}
            isDisabled={isDisabled}
            isError={isError}
            className="mt-0.5"
          />
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;

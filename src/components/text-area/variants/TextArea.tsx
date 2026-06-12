'use client';

import React, { forwardRef, useId, useState } from 'react';
import {
  getCounterStatusColor,
  getHelperStatusColor,
  getLabelStatusColor,
  resolveRightIcon,
} from '../styles/helpers';
import {
  disabledClasses,
  sizeClasses,
  stateClasses,
} from '../styles/text-area';
import type { State, TextAreaProps } from '../types';
import { cn } from '@/utils/cn';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: providedId,
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
      maxLength = 500,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');

    const generatedId = useId();
    const id = providedId ?? generatedId;

    const isControlled = typeof value === 'string';
    const effectiveValue = isControlled ? value : internalValue;

    const charCount = effectiveValue.length;
    const isOverLimit = charCount > maxLength;

    const currentState: State = isOverLimit ? 'error' : state;
    const isError = currentState === 'error';
    const isSuccess = currentState === 'success';
    const isDisabled = Boolean(disabled);

    const resolvedRightIcon = resolveRightIcon(isError, isSuccess, rightIcon);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        <div
          className={cn(
            'relative flex flex-col w-full rounded-lg transition-all',
            sizeClasses[size],
            isDisabled ? disabledClasses : stateClasses[currentState],
            className
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'flex items-center px-4 pt-2 shrink-0',
              resolvedRightIcon ? 'justify-between' : 'justify-start'
            )}
          >
            {label ? (
              <label
                htmlFor={id}
                className={cn(
                  'text-[14px] font-medium transition-colors',
                  getLabelStatusColor(isDisabled, isError)
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            ) : (
              <div />
            )}

            {resolvedRightIcon && (
              <div className={cn('ml-2 shrink-0', isDisabled && 'opacity-50')}>
                {resolvedRightIcon}
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            id={id}
            ref={ref}
            disabled={isDisabled}
            required={required}
            value={effectiveValue}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={cn(
              'flex-1 w-full bg-transparent outline-none resize-none',
              'px-4 py-2 text-[14px] placeholder:text-content-secondary',
              'disabled:cursor-not-allowed',
              isDisabled ? 'text-content-secondary' : 'text-black'
            )}
            {...props}
          />

          {/* Counter */}
          <div className="flex justify-end px-4 pb-2 shrink-0">
            <span
              className={cn(
                'text-[14px] transition-colors',
                getCounterStatusColor(isDisabled, isOverLimit)
              )}
            >
              {charCount}/{maxLength}
            </span>
          </div>
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              'text-[12px]',
              getHelperStatusColor(isError, isSuccess)
            )}
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

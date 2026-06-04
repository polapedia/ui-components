import { useId } from 'react';
import type { FormControlState } from './types';

interface UseFormControlProps {
  id?: string;
  disabled?: boolean;
  state?: FormControlState;
  helperText?: string;
}

export function useFormControl({
  id,
  disabled,
  state = 'default',
  helperText,
}: UseFormControlProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const isError = state === 'error';
  const isSuccess = state === 'success';
  const isDisabled = !!disabled;

  return {
    inputId,
    helperId,
    isError,
    isSuccess,
    isDisabled,
  };
}

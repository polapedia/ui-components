export const FORM_CONTROL_WRAPPER_CLASSES =
  'group flex items-center gap-[4px] w-full relative';

export function getHelperTextColor(
  isError: boolean,
  isDisabled: boolean,
  isSuccess: boolean = false
) {
  if (isError) return 'text-accents-red';
  if (isSuccess) return 'text-green-600';
  if (isDisabled) return 'text-gray-400';
  return 'text-gray-500';
}

export function getLabelTextColor(
  isError: boolean,
  isDisabled: boolean,
  variant: 'checkbox' | 'radio' | 'input' = 'checkbox',
  isSuccess: boolean = false
) {
  if (isError) return 'text-accents-red';
  if (isSuccess && variant === 'input') return 'text-green-600';

  if (variant === 'radio') {
    if (isDisabled) return 'text-gray-400';
    return 'text-gray-900';
  }

  if (isDisabled) return 'text-neutral-500';
  return 'text-black';
}

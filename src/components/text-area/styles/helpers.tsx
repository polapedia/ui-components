import type { ReactNode } from 'react';
import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';

export function getLabelStatusColor(
  isDisabled: boolean,
  isError: boolean
): string {
  if (isDisabled) return 'text-content-secondary';
  if (isError) return 'text-accents-red';
  return 'text-content-secondary';
}

export function getCounterStatusColor(
  isDisabled: boolean,
  isOverLimit: boolean
): string {
  if (isDisabled) return 'text-content-secondary';
  if (isOverLimit) return 'text-accents-red font-bold';
  return 'text-content-secondary';
}

export function getHelperStatusColor(
  isError: boolean,
  isSuccess: boolean
): string {
  if (isError) return 'text-red-500';
  if (isSuccess) return 'text-green-600';
  return 'text-gray-500';
}

export function resolveRightIcon(
  isError: boolean,
  isSuccess: boolean,
  rightIcon: ReactNode
): ReactNode {
  if (isError) return <AlertIcon className="text-red-500 w-5 h-5" />;
  if (isSuccess) return <CheckIcon className="text-green-500 w-5 h-5" />;
  return rightIcon;
}

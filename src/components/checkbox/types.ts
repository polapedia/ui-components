import type { BaseFormControlProps } from '../form-control/types';

export type CheckboxVariant = 'primary' | 'secondary';

export type CheckboxProps = BaseFormControlProps & {
  variant?: CheckboxVariant;
  indeterminate?: boolean;
};

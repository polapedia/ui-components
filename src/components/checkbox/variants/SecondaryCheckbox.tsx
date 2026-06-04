import { cn } from '../../../utils/cn';
import { inputSizeClasses, baseOverlayClasses } from '../styles/checkbox';
import { BaseCheckbox, type SharedCheckboxInputProps } from './BaseCheckbox';

export function SecondaryCheckboxInput(
  props: Readonly<SharedCheckboxInputProps>
) {
  const { size, isDisabled, isError, isActive } = props;

  return (
    <BaseCheckbox {...props} focusRingColor="ring-primary-400">
      {!isDisabled && !isError && (
        <div
          className={cn(
            baseOverlayClasses,
            'transition-all duration-200 ease-in-out',
            inputSizeClasses[size],
            'bg-primary-400',
            'group-hover/cb:bg-primary-300',
            'group-active/cb:bg-primary-600',
            isActive ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100'
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
    </BaseCheckbox>
  );
}

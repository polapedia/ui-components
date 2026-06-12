import { cn } from '../../../utils/cn';
import { inputSizeClasses, baseOverlayClasses } from '../styles/checkbox';
import { BaseCheckbox, type SharedCheckboxInputProps } from './BaseCheckbox';

export function PrimaryCheckboxInput(
  props: Readonly<SharedCheckboxInputProps>
) {
  const { size, isDisabled, isError, isActive } = props;

  return (
    <BaseCheckbox {...props} focusRingColor="ring-primary-700">
      {!isDisabled && !isError && (
        <>
          <div
            className={cn(
              baseOverlayClasses,
              inputSizeClasses[size],
              'bg-linear-to-b from-gradient-primary to-gradient-secondary',
              isActive
                ? 'opacity-100 group-hover/cb:opacity-0 group-active/cb:opacity-0'
                : 'opacity-0 peer-checked:opacity-100 peer-checked:group-hover/cb:opacity-0 peer-checked:group-active/cb:opacity-0'
            )}
          />

          <div
            className={cn(
              baseOverlayClasses,
              inputSizeClasses[size],
              'bg-primary-700',
              isActive
                ? 'opacity-0 group-hover/cb:opacity-100 group-active/cb:opacity-0'
                : 'opacity-0 peer-checked:group-hover/cb:opacity-100 peer-checked:group-active/cb:opacity-0'
            )}
          />

          <div
            className={cn(
              baseOverlayClasses,
              inputSizeClasses[size],
              'bg-primary-800',
              isActive
                ? 'opacity-0 group-active/cb:opacity-100'
                : 'opacity-0 peer-checked:group-active/cb:opacity-100'
            )}
          />
        </>
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

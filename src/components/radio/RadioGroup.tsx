import Radio from '.';
import { FormHelperText } from '../form-control';
import { useFormControl } from '../form-control/useFormControl';

type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'error';

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name?: string;
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (_value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  size = 'md',
  state = 'default',
  label,
  helperText,
  errorText,
  required,
  disabled,
  options,
  value,
  defaultValue,
  onChange,
  className,
}) => {
  const {
    inputId: groupName,
    helperId,
    isError,
    isDisabled,
  } = useFormControl({
    id: name,
    disabled,
    state,
    helperText: helperText || errorText,
  });

  const groupLabelId = `${groupName}-label`;
  const errorId = isError && errorText ? `${groupName}-error` : undefined;

  const describedBy =
    [helperId, errorId].filter(Boolean).join(' ') || undefined;

  const isControlled = value !== undefined;

  return (
    <fieldset
      className={`flex flex-col gap-2 border-0 p-0 m-0 ${className || ''}`}
      aria-invalid={isError ? true : undefined}
      aria-describedby={describedBy}
    >
      {label && (
        <legend
          id={groupLabelId}
          className="mb-1 text-sm font-medium text-gray-900"
        >
          {label}
          {required && <span className="text-accents-red ml-0.5">*</span>}
        </legend>
      )}

      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isOptionDisabled = isDisabled || option.disabled;

          const checked = isControlled
            ? value === option.value
            : defaultValue === option.value;

          return (
            <Radio
              key={option.value}
              name={groupName}
              size={size}
              state={state}
              disabled={isOptionDisabled}
              label={option.label}
              helperText={option.helperText}
              checked={checked}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange?.(option.value);
                }
              }}
            />
          );
        })}
      </div>

      <FormHelperText
        id={isError ? errorId : helperId}
        text={isError ? errorText : helperText}
        isDisabled={isDisabled}
        isError={isError}
        className="mt-1"
      />
    </fieldset>
  );
};

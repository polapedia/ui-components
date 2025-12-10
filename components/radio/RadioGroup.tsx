import { useId } from "react";
import Radio from ".";

type Size = "sm" | "md";
type State = "default" | "error";

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
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  size = "md",
  state = "default",
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
  const generatedId = useId();
  const groupName = name || generatedId;
  const groupLabelId = `${groupName}-label`;
  const helperId = helperText ? `${groupName}-helper` : undefined;
  const errorId =
    state === "error" && errorText ? `${groupName}-error` : undefined;

  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const isError = state === "error";

  // if controlled, use value from props. if uncontrolled, use defaultValue
  const isControlled = value !== undefined;

  return (
    <fieldset
      className={`flex flex-col gap-2 border-0 p-0 m-0 ${className || ""}`}
      aria-invalid={isError ? true : undefined}
      aria-describedby={describedBy}>
      {label && (
        <legend
          id={groupLabelId}
          className="mb-1 text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-accents-red ml-0.5">*</span>}
        </legend>
      )}

      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isOptionDisabled = disabled || option.disabled;

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

      {/* Helper & error at group level */}
      {helperText && !isError && (
        <p
          id={helperId}
          className="mt-1 text-[11px] leading-tight text-gray-500">
          {helperText}
        </p>
      )}
      {isError && errorText && (
        <p
          id={errorId}
          className="mt-1 text-[11px] leading-tight text-accents-red">
          {errorText}
        </p>
      )}
    </fieldset>
  );
};

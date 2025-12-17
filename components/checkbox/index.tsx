import { ComponentProps, forwardRef, useId } from "react";
import CheckmarkIcon from "../icons/CheckmarkIcon";

type Size = "sm" | "md";
type State = "default" | "error";

interface CheckboxProps extends Omit<ComponentProps<"input">, "size"> {
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
}

const wrapperClasses = "group flex items-start gap-[4px] w-full relative";

const inputSizeClasses: Record<Size, string> = {
  sm: "h-4 w-4 rounded",
  md: "h-5 w-5 rounded-md",
};

const labelSizeClasses: Record<Size, string> = {
  sm: "text-[14px] leading-4",
  md: "text-[16px] leading-5",
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      state = "default",
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
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const isError = state === "error";
    const isDisabled = disabled;

    let inputStateClasses = "";

    if (isDisabled) {
      inputStateClasses =
        "bg-neutral-200 border-gray-300 cursor-not-allowed checked:bg-neutral-400 checked:border-neutral-400";
    } else if (isError) {
      inputStateClasses = `
        bg-white border-red-500 text-white
        checked:bg-red-500 checked:border-red-500
        focus:ring-red-500
      `;
    } else {
      inputStateClasses = `
        bg-white border-black border-[2px] text-white
        checked:bg-linear-to-b checked:from-gradient-primary checked:to-gradient-secondary checked:border-0
      `;
    }

    return (
      <div className={`${wrapperClasses} ${className || ""}`}>
        {/* Wrapper Checkbox */}
        <div className={`flex items-center justify-center shrink-0`}>
          <div className="relative flex items-center">
            <div className="group grid place-items-center">
              {/* Input Checkbox */}
              <input
                ref={ref}
                type="checkbox"
                id={inputId}
                disabled={isDisabled}
                required={required}
                aria-invalid={isError}
                aria-describedby={helperId}
                className={`
                  peer col-start-1 row-start-1 appearance-none border-2 shrink-0 
                  transition-all text-black border-black duration-200 ease-in-out
                  ${inputSizeClasses[size]}
                  ${inputStateClasses}
                `}
                {...props}
              />

              {/* SVG Icon (Checkmark) */}
              <CheckmarkIcon
                className={`
                    pointer-events-none col-start-1 row-start-1 
                    ${size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} 
                    self-center justify-self-center stroke-white 
                    group-has-disabled:stroke-gray-500
                `}
              />
            </div>
          </div>
        </div>

        {/* Label Section */}
        <div className="flex flex-col select-none pt-0">
          {label && (
            <label
              htmlFor={inputId}
              className={`
                font-medium transition-colors
                ${labelSizeClasses[size]}
                ${
                  isDisabled
                    ? "text-neutral-500 cursor-not-allowed"
                    : "text-black cursor-pointer"
                }
                ${isError ? "text-red-500" : ""}
              `}>
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}

          {helperText && (
            <p
              id={helperId}
              className={`mt-1 text-[11px] leading-tight ${
                isError
                  ? "text-red-500"
                  : isDisabled
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}>
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

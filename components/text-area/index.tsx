import React, { forwardRef, ComponentProps, ReactNode, useState } from "react";
import AlertIcon from "../icons/AlertIcon";
import CheckIcon from "../icons/CheckIcon";

type Size = "sm" | "md" | "lg";
type State = "default" | "error" | "success";

interface TextAreaProps extends Omit<ComponentProps<"textarea">, "size"> {
  size?: Size;
  state?: State;
  label?: string;
  helperText?: string;
  rightIcon?: ReactNode;
}

const baseWrapperClasses =
  "relative flex flex-col w-full transition-all border rounded-[8px] overflow-hidden";

const sizeClasses: Record<Size, string> = {
  sm: "h-[120px]",
  md: "h-[150px]",
  lg: "h-[200px]",
};

const focusRingClasses =
  "focus-within:ring-[1px] focus-within:ring-offset-0 focus-within:ring-primary-600";

const stateClasses: Record<State, string> = {
  default: `border-gray-300 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-primary-600 focus-within:border-0`,
  error: `border-red-500 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-red-500`,
  success: `border-green-500 bg-white hover:bg-background-hover ${focusRingClasses} focus-within:border-green-500`,
};

const disabledClasses =
  "bg-gray-200 border-gray-200 cursor-not-allowed select-none";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = "md",
      state = "default",
      className,
      disabled,
      required,
      placeholder,
      helperText,
      value,
      label,
      rightIcon,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");

    const effectiveValue = typeof value === "string" ? value : internalValue;

    const charCount = effectiveValue.length;
    const isOverLimit = charCount > 500;

    const currentState: State = isOverLimit ? "error" : state;

    const isError = currentState === "error";
    const isSuccess = currentState === "success";
    const isDisabled = disabled;

    const wrapperClasses = [
      baseWrapperClasses,
      sizeClasses[size],
      isDisabled ? disabledClasses : stateClasses[currentState],
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    let renderedRightIcon = rightIcon;
    if (isError) {
      renderedRightIcon = <AlertIcon className="text-red-500 w-5 h-5" />;
    } else if (isSuccess) {
      renderedRightIcon = <CheckIcon className="text-green-500 w-5 h-5" />;
    }

    const labelColor = isDisabled
      ? "text-gray-400"
      : isError
      ? "text-red-500"
      : "text-gray-600";

    const counterColor = isDisabled
      ? "text-gray-400"
      : isOverLimit
      ? "text-red-500 font-bold"
      : "text-gray-400";

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (typeof value !== "string") {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div
        className={`w-full flex flex-col gap-1.5 font-sans ${sizeClasses[size]}`}>
        <div className={wrapperClasses}>
          <div
            className={`flex items-center px-4 pt-2 shrink-0 ${
              renderedRightIcon ? "justify-between" : "justify-center"
            }`}>
            {label ? (
              <label
                className={`text-[14px] font-medium transition-colors ${labelColor}`}>
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            ) : (
              <div />
            )}
            {renderedRightIcon && (
              <div
                className={`shrink-0 ml-2 ${isDisabled ? "opacity-50" : ""}`}>
                {renderedRightIcon}
              </div>
            )}
          </div>

          <textarea
            ref={ref}
            disabled={isDisabled}
            required={required}
            value={effectiveValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={`
              flex-1 w-full bg-transparent border-none outline-none 
              px-4 py-2 resize-none text-[14px] placeholder:text-gray-400/70
              disabled:cursor-not-allowed
              ${isDisabled ? "text-gray-500" : "text-gray-900"}
              ${sizeClasses[size]}
            `}
            {...props}
          />

          <div className="flex justify-end px-4 pb-2 shrink-0">
            <span className={`text-[12px] transition-colors ${counterColor}`}>
              {charCount}/500
            </span>
          </div>
        </div>

        {helperText && (
          <p
            className={`text-[12px] ${
              isError
                ? "text-red-500"
                : isSuccess
                ? "text-green-600"
                : "text-gray-500"
            }`}>
            {isOverLimit ? "Character limit exceeded" : helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;

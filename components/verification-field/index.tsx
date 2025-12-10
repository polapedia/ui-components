import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";

type Size = "sm" | "md";

interface VerificationFieldProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  className?: string;
  size?: Size;
}

export interface VerificationFieldRef {
  focus: () => void;
  clear: () => void;
}

const VerificationField = forwardRef<
  VerificationFieldRef,
  VerificationFieldProps
>(
  (
    {
      length = 4,
      value,
      onChange,
      onComplete,
      disabled,
      autoFocus,
      label,
      helperText,
      error,
      className,
      size = "md",
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>("");
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value! : internalValue;

    const sizeBoxClasses: Record<Size, string> = {
      sm: "w-[36px] h-[36px]",
      md: "w-10 h-10",
    };

    const sizeTextClasses: Record<Size, string> = {
      sm: "text-[14px]",
      md: "text-[16px]",
    };

    // helpers
    const updateValue = (next: string) => {
      const trimmed = next.slice(0, length);
      if (!isControlled) {
        setInternalValue(trimmed);
      }
      onChange?.(trimmed);
      if (trimmed.length === length && !trimmed.includes("_")) {
        onComplete?.(trimmed);
      }
    };

    const getCharAt = (idx: number) => currentValue[idx] ?? "";

    // expose methods
    useImperativeHandle(ref, () => ({
      focus() {
        inputsRef.current[0]?.focus();
      },
      clear() {
        updateValue("");
        inputsRef.current[0]?.focus();
      },
    }));

    useEffect(() => {
      if (autoFocus && !disabled) {
        inputsRef.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    // event handlers
    const handleInputChange =
      (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const char = e.target.value;

        // only digits
        if (char && !/^[0-9]$/.test(char)) {
          e.target.value = "";
          return;
        }

        const chars = currentValue.split("");
        while (chars.length < length) chars.push("");

        chars[index] = char;
        const joined = chars.join("").slice(0, length);
        updateValue(joined);

        if (char && index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
      };

    const handleKeyDown =
      (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        const key = e.key;

        if (key === "Backspace" || key === "Delete") {
          const chars = currentValue.split("");
          while (chars.length < length) chars.push("");

          if (chars[index]) {
            chars[index] = "";
            const joined = chars.join("");
            updateValue(joined);
          } else if (index > 0) {
            inputsRef.current[index - 1]?.focus();
            const prevChars = currentValue.split("");
            while (prevChars.length < length) prevChars.push("");
            prevChars[index - 1] = "";
            updateValue(prevChars.join(""));
          }
          e.preventDefault();
        }

        if (key === "ArrowLeft" && index > 0) {
          inputsRef.current[index - 1]?.focus();
          e.preventDefault();
        } else if (key === "ArrowRight" && index < length - 1) {
          inputsRef.current[index + 1]?.focus();
          e.preventDefault();
        }
      };

    const handlePaste =
      (index: number) => (e: ClipboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!text) return;

        const chars = currentValue.split("");
        while (chars.length < length) chars.push("");

        for (let i = 0; i < text.length && index + i < length; i++) {
          chars[index + i] = text[i];
        }

        const joined = chars.join("");
        updateValue(joined);

        const nextIndex = Math.min(index + text.length, length - 1);
        inputsRef.current[nextIndex]?.focus();
      };

    // styling
    const wrapperClasses = ["flex flex-col gap-1.5", className || ""]
      .filter(Boolean)
      .join(" ");

    const helperClasses = [
      "text-[14px]",
      error ? "text-accents-red" : "text-content-secondary",
    ].join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="text-[14px] text-content-primary">{label}</label>
        )}

        <div className="flex gap-4">
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className={`
                ${
                  sizeBoxClasses[size]
                } rounded-full bg-white flex items-center justify-center
                border ${error ? "border-accents-red" : "border-gray-300"}
                shadow-sm hover:bg-background-hover transition-colors
                focus-within:ring-1 focus-within:ring-primary-600 focus-within:ring-offset-0
              `}>
              <input
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                disabled={disabled}
                value={getCharAt(index)}
                onChange={handleInputChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={handlePaste(index)}
                className={[
                  "w-full h-full bg-transparent text-center text-content-primary outline-none border-none caret-transparent disabled:cursor-not-allowed focus:outline-none",
                  sizeTextClasses[size],
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </div>
          ))}
        </div>

        {helperText && <p className={helperClasses}>{helperText}</p>}
      </div>
    );
  }
);

VerificationField.displayName = "VerificationField";

export default VerificationField;
export type { VerificationFieldProps };

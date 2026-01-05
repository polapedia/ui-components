import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";
type Variant = "default" | "fill" | "stroke";

export interface InputNumberProps
  extends Omit<
    ComponentProps<"input">,
    "size" | "type" | "value" | "onChange"
  > {
  size?: Size;
  variant?: Variant;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const heightClasses: Record<Size, string> = {
  sm: "h-[20px] text-[14px] rounded-[4px]",
  md: "h-[24px] text-[14px] rounded-[4px]",
  lg: "h-[32px] text-[16px] rounded-[8px]",
  xl: "h-[40px] text-[18px] rounded-[12px]",
  "2xl": "h-[48px] text-[20px] rounded-[12px]",
};

const circleButtonSize: Record<Size, string> = {
  sm: "w-[18px] h-[18px]",
  md: "w-[18px] h-[18px]",
  lg: "w-[20px] h-[20px]",
  xl: "w-[24px] h-[24px]",
  "2xl": "w-[24px] h-[24px]",
};

const iconScaleClasses: Record<Size, string> = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
  "2xl": "w-5 h-5",
};

const defaultIconSize: Record<Size, string> = {
  sm: "w-[10px] h-[10px]",
  md: "w-[10px] h-[10px]",
  lg: "w-[12px] h-[12px]",
  xl: "w-[14px] h-[14px]",
  "2xl": "w-[16px] h-[16px]",
};

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      size = "md",
      variant = "default",
      value,
      min,
      max,
      step = 1,
      disabled,
      className,
      id,
      name,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<string>(String(value));
    const localInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (isEditing) {
        // focus + select all text
        const el = localInputRef.current;
        if (el) {
          el.focus();
          el.select();
        }
      }
    }, [isEditing]);

    // logic
    const clamp = (val: number) => {
      let next = val;
      if (typeof min === "number") next = Math.max(next, min);
      if (typeof max === "number") next = Math.min(next, max);
      return next;
    };

    const commitDraft = () => {
      if (disabled) return;

      const trimmedValue = draft.trim();
      if (trimmedValue === "") {
        setDraft(String(value));
        setIsEditing(false);
        return;
      }

      const raw = Number(trimmedValue);
      if (Number.isNaN(raw)) {
        setDraft(String(value));
        setIsEditing(false);
        return;
      }

      onChange?.(clamp(raw));
      setIsEditing(false);
    };

    const cancelDraft = () => {
      setDraft(String(value));
      setIsEditing(false);
    };

    const handleChange = (next: number) => {
      if (disabled) return;
      onChange?.(clamp(next));
    };

    const handleDecrease = () => handleChange(value - (Number(step) || 1));
    const handleIncrease = () => handleChange(value + (Number(step) || 1));

    const minusIsDisabled =
      disabled || (typeof min === "number" && value <= min);
    const plusIsDisabled =
      disabled || (typeof max === "number" && value >= max);

    // Styling
    const getContainerStyles = () => {
      const base =
        "inline-flex items-center justify-between select-none transition-all";
      switch (variant) {
        case "fill":
          return `${base} bg-neutral-500 px-2 gap-4 ${heightClasses[size]}`;
        case "stroke":
          return `${base} border border-neutral-500 px-2 gap-4 ${heightClasses[size]}`;
        case "default":
        default:
          return `${base} gap-3 ${heightClasses[size]}`;
      }
    };

    const getButtonStyles = (type: "minus" | "plus") => {
      const baseButton =
        "flex items-center justify-center transition-opacity select-none";
      const disabledClass = "opacity-40 cursor-not-allowed";
      const activeClass = "cursor-pointer active:scale-90";
      const isDisabled = type === "minus" ? minusIsDisabled : plusIsDisabled;
      const stateClass = isDisabled ? disabledClass : activeClass;

      if (variant === "default") {
        const sizeClass = circleButtonSize[size];
        if (type === "minus") {
          return `${baseButton} ${sizeClass} rounded-full bg-neutral-500 text-white ${stateClass}`;
        } else {
          return `${baseButton} ${sizeClass} rounded-full border border-primary-600 text-primary-600 bg-white ${stateClass}`;
        }
      } else {
        return `${baseButton} text-primary-600 ${stateClass} px-1`;
      }
    };

    const getValueColor = () => {
      if (disabled) return "text-gray-400";
      if (variant === "fill") return "text-white";
      return "text-black";
    };

    const getIconClass = () => {
      if (variant === "default") return defaultIconSize[size];
      return iconScaleClasses[size];
    };

    return (
      <div className={`${getContainerStyles()} ${className || ""}`}>
        {/* Minus Button */}
        <button
          type="button"
          disabled={minusIsDisabled}
          onClick={handleDecrease}
          className={getButtonStyles("minus")}>
          <MinusIcon className={getIconClass()} />
        </button>

        {/* Value / Edit Mode */}
        <div className="relative flex-1 text-center min-w-5">
          {!isEditing ? (
            <span
              className={`block font-semibold ${getValueColor()} ${
                disabled ? "cursor-not-allowed" : "cursor-text"
              }`}
              onClick={() => {
                if (disabled) return;
                setDraft(String(value));
                setIsEditing(true);
              }}
              title={disabled ? undefined : "Klik untuk edit"}>
              {value}
            </span>
          ) : (
            <input
              ref={(node) => {
                localInputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref)
                  (ref as React.RefObject<HTMLInputElement | null>).current =
                    node;
              }}
              id={inputId}
              name={name}
              type="number"
              inputMode="numeric"
              value={draft}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitDraft}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitDraft();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancelDraft();
                }
              }}
              className={`w-full bg-transparent text-center font-semibold outline-none ${getValueColor()}`}
              {...rest}
            />
          )}
        </div>

        {/* Plus Button */}
        <button
          type="button"
          disabled={plusIsDisabled}
          onClick={handleIncrease}
          className={getButtonStyles("plus")}>
          <PlusIcon className={getIconClass()} />
        </button>
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";
export default InputNumber;

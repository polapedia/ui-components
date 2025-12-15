import { useState, useRef, useEffect, ReactNode, HTMLAttributes } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "error" | "inverted" | "disabled";

export interface ButtonDropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-[40px] text-[16px] px-4 rounded-[22px]",
  md: "h-[56px] text-[20px] px-6 rounded-[30px]",
  lg: "h-[70px] text-[24px] px-8 rounded-[37px]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "text-white bg-linear-to-b from-gradient-primary to-gradient-secondary hover:brightness-110 active:brightness-90",
  inverted:
    "text-white bg-background-inverse hover:bg-background-inverse/90 active:bg-background-inverse",
  error:
    "text-white bg-accents-red hover:bg-accents-red/90 active:bg-accents-red",
  disabled:
    "text-white bg-background-disabled hover:bg-background-disabled/90 active:bg-background-disabled",
};

const dividerOpacity: Record<Variant, string> = {
  primary: "bg-white/30",
  inverted: "bg-white/20",
  error: "bg-white/30",
  disabled: "bg-white/30",
};

export default function ButtonDropdown({
  label,
  leftIcon,
  rightIcon,
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  className,
  ...props
}: ButtonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const containerBase =
    "relative inline-flex font-semibold transition-all select-none group z-10";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed grayscale"
    : "cursor-pointer";

  return (
    <div
      ref={containerRef}
      className={`${containerBase} ${className || ""}`}
      {...props}>
      {/* Button Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${disabledClass}
          transition-all duration-200
        `}>
        {/* Main Content */}
        <div className="flex items-center gap-2">
          {leftIcon && (
            <span className="inline-flex opacity-90">{leftIcon}</span>
          )}
          <span className="pr-0">{label}</span>
        </div>

        {/* Vertical Divider */}
        <div
          className={`w-px h-1/2 self-center mx-2 ${dividerOpacity[variant]}`}
        />

        {/* Right Section: Chevron */}
        <div className="pl-2">
          {rightIcon ? (
            <span className="inline-flex opacity-90">{rightIcon}</span>
          ) : (
            <span className="inline-flex items-center justify-center">
              <ChevronDownIcon
                className={`block transition-transform duration-300 w-3 h-3 md:w-4 md:h-4 ${
                  isOpen ? "-rotate-180" : "rotate-0"
                } ${!isOpen && size === "sm" ? "mt-2" : "mt-1.5"}`}
              />
            </span>
          )}
        </div>
      </button>

      {/* Dropdown Content */}
      <div
        className={`
    absolute left-0 top-full mt-2
    transition-all duration-300 ease-out origin-top z-50
    ${
      isOpen
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
    }
  `}>
        <div className="w-fit min-w-[264px] bg-background-disabled font-normal text-white text-[16px] p-2 rounded-xl text-left leading-relaxed whitespace-normal wrap-break-word">
          {children || (
            <p className="text-white">
              This is the example of trigger action that button dropdown has.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { ComponentProps, ReactNode, forwardRef } from "react";

type Size = "sm" | "md" | "lg";

export interface SearchBarProps extends Omit<ComponentProps<"input">, "size"> {
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses = [
  "flex items-center gap-3",
  "bg-white",
  "shadow-[0_4px_24px_-2px_rgba(15,35,52,0.08)]",
  "px-3 py-3",
  "transition-all duration-200 ease-in-out",
  "hover:shadow-[0_12px_32px_-1px_rgba(15,35,52,0.12)]",
  "hover:ring-1 hover:ring-primary-600",
  "focus-within:shadow-[0_12px_32px_-1px_rgba(15,35,52,0.12)]",
  "focus-within:ring-1 focus-within:ring-primary-600",
].join(" ");

const sizeClasses: Record<Size, string> = {
  sm: "h-[48px] rounded-[8px]",
  md: "h-[52px] rounded-[12px]",
  lg: "h-[56px] rounded-[16px]",
};

const iconClasses =
  "flex items-center justify-center text-content-secondary [&_svg]:size-4";

const inputClasses = [
  "w-full bg-transparent border-none outline-none",
  "text-[14px] text-content-primary",
  "placeholder:text-content-secondary/60",
  "placeholder:font-medium",
].join(" ");

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ size = "md", leftIcon, rightIcon, className, ...props }, ref) => {
    const containerClasses = [baseClasses, sizeClasses[size], className || ""]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {leftIcon && <span className={iconClasses}>{leftIcon}</span>}

        <input ref={ref} type="text" className={inputClasses} {...props} />

        {rightIcon && <span className={iconClasses}>{rightIcon}</span>}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;

import { ComponentProps, ReactNode, forwardRef } from "react";

type Size = "sm" | "md" | "lg";

export interface SearchBarProps extends Omit<ComponentProps<"input">, "size"> {
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses = [
  "flex items-center gap-2",
  "bg-white",
  "shadow-lg",
  "p-3",
  "transition-all duration-200 ease-in-out",
  "hover:ring-1 hover:ring-primary-600",
  "focus-within:ring-1 focus-within:ring-primary-600",
].join(" ");

const sizeClasses: Record<Size, string> = {
  sm: "h-[48px] rounded-[8px]",
  md: "h-[52px] rounded-[12px]",
  lg: "h-[56px] rounded-[16px]",
};

const iconClasses = "flex items-center justify-center text-content-secondary";

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

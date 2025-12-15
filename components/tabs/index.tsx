import { ReactNode } from "react";

export type TabVariant = "underline" | "solid";
export type TabSize = "sm" | "md";
export type TabIconPosition = "left" | "top";

export interface TabItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: TabVariant;
  size?: TabSize;
  iconPosition?: TabIconPosition;
  className?: string;
}

const sizeClasses: Record<TabSize, string> = {
  sm: "text-[14px] px-3 py-2 gap-2",
  md: "text-[16px] px-4 py-3 gap-2.5",
};

const tabBaseClasses =
  "relative flex items-center justify-center font-medium transition-all whitespace-nowrap select-none focus:outline-none";

export default function Tabs({
  items,
  value,
  onChange,
  variant = "underline",
  size = "md",
  iconPosition = "left",
  className,
}: TabsProps) {
  const isSingle = items.length === 1;

  // helpers
  const getUnderlineClasses = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return isSingle
        ? "border-b border-gray-100 text-gray-300 cursor-not-allowed"
        : "text-gray-300 cursor-not-allowed";
    }

    if (isActive) {
      return isSingle
        ? "border-b-2 border-primary-600 text-primary-600"
        : "border-b-2 border-primary-600 text-primary-600 -mb-[1px]";
    }

    return isSingle
      ? "border-b border-gray-200 text-gray-600 hover:text-content-secondary hover:border-gray-300 hover:bg-background-pressed"
      : "text-gray-600 hover:text-content-secondary hover:bg-background-pressed";
  };

  const getSolidClasses = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return "bg-gray-50 text-gray-300 cursor-not-allowed";
    }

    if (isActive) {
      return "bg-linear-to-b from-gradient-primary to-gradient-primary text-white shadow-sm";
    }

    return "bg-white text-gray-500 hover:bg-background-pressed hover:text-content-secondary";
  };

  const containerClasses = [
    "inline-flex flex-row",
    variant === "solid" ? "flex-wrap gap-3 p-1" : "gap-6",
    variant === "underline" && !isSingle ? "border-b border-gray-200" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const orientationClasses = iconPosition === "top" ? "flex-col" : "flex-row";

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div role="tablist" className={containerClasses}>
        {items.map((item) => {
          const isActive = value === item.value;
          const isDisabled = !!item.disabled;

          const variantClasses =
            variant === "solid"
              ? getSolidClasses(isActive, isDisabled)
              : getUnderlineClasses(isActive, isDisabled);

          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(item.value)}
              className={[
                tabBaseClasses,
                sizeClasses[size],
                orientationClasses,
                variant === "solid" ? "rounded-lg" : "",
                variantClasses,
              ].join(" ")}>
              {/* Icon */}
              {item.icon && (
                <span
                  className={`flex items-center justify-center ${
                    size === "sm"
                      ? "[&_svg]:w-4 [&_svg]:h-4"
                      : "[&_svg]:w-5 [&_svg]:h-5"
                  }`}>
                  {item.icon}
                </span>
              )}

              {/* Label */}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

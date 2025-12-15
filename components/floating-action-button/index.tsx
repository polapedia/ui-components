import { ButtonHTMLAttributes, ReactNode } from "react";
import PlusIcon from "../icons/PlusIcon";

type Variant = "primary" | "danger";
type Size = "sm" | "md" | "lg";

interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-linear-to-b from-gradient-primary to-gradient-secondary text-white",

  danger: "bg-error-icon-color text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "w-10 h-10 p-2",
  md: "w-12 h-12 p-3",
  lg: "w-14 h-14 p-4",
};

export default function FloatingActionButton({
  icon,
  variant = "primary",
  size = "lg",
  className,
  ...rest
}: FloatingActionButtonProps) {
  return (
    <button
      className={[
        "flex items-center justify-center rounded-full shadow-lg transition-all duration-200",
        "active:scale-95 focus:outline-none hover:bg-background-hover active:bg-background-pressed focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}>
      {icon || <PlusIcon />}
    </button>
  );
}

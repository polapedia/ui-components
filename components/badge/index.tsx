import { HTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "destructive"
  | "blue"
  | "red"
  | "brown"
  | "green";

type Size = "lg" | "md" | "dot";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center font-regular whitespace-nowrap transition-colors select-none";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-linear-to-b from-gradient-primary to-gradient-secondary text-white text-[14px]",
  secondary: [
    "bg-background-hover text-gradient-secondary",
    "bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text text-transparent text-[14px]",
  ].join(" "),
  destructive: "bg-accents-red text-white text-[14px]",
  blue: "bg-accents-blue text-white",
  red: "bg-accents-red text-white",
  brown: "bg-accents-brown text-white",
  green: "bg-accents-green text-white",
};

const sizeClasses: Record<Size, string> = {
  // main
  lg: "h-[28px] px-[4px] py-[4px] rounded-lg gap-2",
  // notification badges
  md: "h-[24px] min-w-[24px] px-[6px] py-[2px] rounded-full gap-1",
  // status dots
  dot: "w-[20px] h-[20px] rounded-full flex items-center justify-center p-[4px]",
};

export default function Badge({
  className,
  variant = "primary",
  size = "md",
  children,
  leftIcon,
  rightIcon,
  ...props
}: BadgeProps) {
  const isDot = size === "dot";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {isDot ? (
        leftIcon && <span className="inline-flex">{leftIcon}</span>
      ) : (
        <>
          {leftIcon && <span className="inline-flex ml-1">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex mr-1">{rightIcon}</span>}
        </>
      )}
    </div>
  );
}

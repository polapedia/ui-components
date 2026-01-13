import { ComponentProps, ReactNode } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";

type Variant = "primary" | "secondary" | "tertiary";

type Size = "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg";

type Shape = "rectangle" | "pill" | "circle";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center font-semibold transition-all disabled:cursor-not-allowed select-none";

const variantClasses: Record<Variant, string> = {
  primary: [
    "text-white bg-linear-to-b from-gradient-primary to-gradient-secondary",
    "hover:from-primary-700 hover:to-primary-700",
    "active:from-primary-900 active:to-primary-900",
  ].join(" "),
  secondary: [
    "bg-white border border-content-secondary text-content-secondary",
    "hover:bg-background-hover hover:text-content-primary",
    "active:bg-background-pressed active:text-content-primary",
  ].join(" "),
  tertiary: [
    "bg-white",
    "hover:bg-background-hover hover:text-primary-700",
    "active:bg-background-pressed active:text-primary-900",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 text-[14px] py-1 px-5",
  md: "h-10 text-[14px] px-3 py-2.5",
  lg: "h-[58px] text-[24px] px-5 py-3",

  "icon-sm": "w-8 h-8 p-0",
  "icon-md": "w-10 h-10 p-0",
  "icon-lg": "w-14 h-14 p-0",
};

const shapeClasses: Record<Shape, string> = {
  rectangle: "",
  pill: "rounded-full",
  circle: "rounded-full p-0 flex items-center justify-center",
};

const compoundClasses: Record<string, string> = {
  "rectangle-sm": "rounded-sm",
  "rectangle-md": "rounded-[8px]",
  "rectangle-lg": "rounded-[12px]",

  "circle-sm": "w-[32px] h-[32px] px-0",
  "circle-md": "w-[48px] h-[48px] px-0",
  "circle-lg": "w-[56px] h-[56px] px-0",
};

export default function Button({
  variant = "primary",
  size = "md",
  shape = "rectangle",
  isLoading,
  className,
  children,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const isIconOnly = shape === "circle" || size.startsWith("icon-");

  const key = `${shape}-${size}` as keyof typeof compoundClasses;

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    compoundClasses[key] || "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const isTertiary = variant === "tertiary";

  const iconColorClass = isTertiary
    ? "text-accents-red hover:text-primary-700 active:text-primary-900"
    : variant === "secondary"
    ? "text-content-primary"
    : "text-white";

  const spinnerColorClass = isTertiary
    ? "text-accents-red"
    : variant === "secondary"
    ? "text-content-secondary"
    : "text-white";

  const spinnerSizeClass =
    size === "sm"
      ? "size-4"
      : size === "md"
      ? "size-5"
      : size === "lg"
      ? "size-6"
      : "size-5";

  return (
    <button disabled={isDisabled} className={classes} {...props}>
      {isLoading && (
        <SpinnerIcon
          className={["animate-spin", spinnerSizeClass, spinnerColorClass]
            .filter(Boolean)
            .join(" ")}
        />
      )}

      {!isLoading && (
        <>
          {isIconOnly ? (
            leftIcon && <span className="inline-flex">{leftIcon}</span>
          ) : (
            <>
              {leftIcon && (
                <span className={`inline-flex mr-[18px] ${iconColorClass}`}>
                  {leftIcon}
                </span>
              )}
              <span
                className={
                  isTertiary
                    ? "bg-linear-to-b from-gradient-primary to-gradient-secondary bg-clip-text text-transparent"
                    : ""
                }
              >
                {children}
              </span>
              {rightIcon && (
                <span className={`inline-flex ml-[18px] ${iconColorClass}`}>
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </>
      )}
    </button>
  );
}

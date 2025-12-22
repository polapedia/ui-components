import Link, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";

type Variant = "underline" | "no-underline";
type Size = "sm" | "md" | "lg";

interface TextLinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  rightIcon?: ReactNode;
  withIcon?: boolean;
  className?: string;
}

const baseClasses =
  "inline-flex items-center text-info-icon-color font-medium transition-opacity hover:opacity-80";

const variantClasses: Record<Variant, string> = {
  underline: "underline underline-offset-4",
  "no-underline": "",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-[14px] gap-x-1 [&_svg]:w-[24px] [&_svg]:h-[24px]",
  md: "text-[16px] gap-x-1.5 [&_svg]:w-[32px] [&_svg]:h-[32px]",
  lg: "text-[24px] gap-x-2 [&_svg]:w-[32px] [&_svg]:h-[32px]",
};

export default function TextLink({
  variant = "no-underline",
  size = "md",
  children,
  rightIcon,
  withIcon = true,
  className,
  ...props
}: TextLinkProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconToRender = rightIcon || <ExternalLinkIcon />;

  return (
    <Link className={classes} {...props}>
      <span>{children}</span>
      {withIcon && iconToRender}
    </Link>
  );
}

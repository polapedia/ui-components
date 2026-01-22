import { HTMLAttributes, ReactNode } from "react";
import CloseIcon from "../icons/CloseIcon";
import CheckIcon from "../icons/CheckIcon";

type Variant = "default" | "error" | "success";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  message: string;

  dismissible?: boolean;
  onClose?: () => void;

  rightIcon?: ReactNode;
}

const baseClasses =
  "flex items-center justify-between h-[48px] px-[10px] py-[14px] rounded-[12px] text-[14px] font-medium text-black";

const variantClasses: Record<Variant, string> = {
  default: "bg-primary",
  error: "bg-error-background",
  success: "bg-success-background",
};

export default function Toast({
  variant = "default",
  message,
  dismissible = false,
  onClose,
  rightIcon,
  className,
  ...props
}: ToastProps) {
  const classes = [baseClasses, variantClasses[variant], className || ""]
    .filter(Boolean)
    .join(" ");

  const showDismiss = dismissible && onClose;

  const resolvedRightIcon =
    rightIcon ??
    (showDismiss ? (
      <CloseIcon className="w-4 h-4" />
    ) : variant === "success" ? (
      <CheckIcon className="w-4 h-4 text-[#323232]" />
    ) : null);

  return (
    <div className={classes} {...props}>
      <span>{message}</span>

      {resolvedRightIcon && (
        <button
          type="button"
          onClick={showDismiss ? onClose : undefined}
          aria-label={showDismiss ? "Close notification" : undefined}
          className="ml-2.5 shrink-0 flex items-center">
          {resolvedRightIcon}
        </button>
      )}
    </div>
  );
}

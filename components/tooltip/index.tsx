import { HTMLAttributes, ReactNode, useId, useMemo, useState } from "react";

type Placement = "top" | "bottom" | "left" | "right";

type SpanProps = Omit<HTMLAttributes<HTMLSpanElement>, "content" | "children">;

export interface TooltipProps extends SpanProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiline?: boolean;
  maxWidthClassName?: string; // used if multiline is true
}

const baseTooltipClasses =
  "py-[8px] px-[12px] bg-neutral-500 text-white text-[14px] font-medium rounded-lg";

function placementClasses(placement: Placement) {
  switch (placement) {
    case "top":
      return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 -translate-y-1/2 mr-2";
    case "right":
    default:
      return "left-full top-1/2 -translate-y-1/2 ml-2";
  }
}

export default function Tooltip({
  content,
  children,
  placement = "top",
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  multiline,
  maxWidthClassName = "max-w-[316px]",
  ...props
}: TooltipProps) {
  const reactId = useId();
  const tooltipId = useMemo(() => `tooltip-${reactId}`, [reactId]);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const wrapperClasses = ["relative inline-flex", className || ""]
    .filter(Boolean)
    .join(" ");

  const tooltipClasses = [
    "absolute z-50",
    baseTooltipClasses,
    multiline
      ? [
          "min-w-[320px]",
          maxWidthClassName,
          "whitespace-normal break-words",
        ].join(" ")
      : "w-max whitespace-nowrap",
    placementClasses(placement),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={wrapperClasses}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}>
      {/* Trigger */}
      <span aria-describedby={isOpen ? tooltipId : undefined}>{children}</span>

      {/* Tooltip */}
      {isOpen && (
        <span id={tooltipId} role="tooltip" className={tooltipClasses}>
          {content}
        </span>
      )}
    </span>
  );
}

import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Size = "sm" | "lg";
type Placement = "top" | "bottom";

export interface OnboardingTooltipProps {
  children: ReactNode;

  title?: string;
  description?: string;
  footer?: ReactNode;

  size?: Size;
  placement?: Placement;

  overlayClassName?: string;
  className?: string;

  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const baseCardClasses = "p-[12px] bg-white text-black rounded-[16px] shadow-lg";
const sizeClasses: Record<Size, string> = {
  sm: "w-[240px]",
  lg: "w-[280px]",
};

const titleClasses = "font-semibold text-[16px] leading-snug";
const descClasses = "text-[14px] font-normal leading-snug";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function OnboardingTooltip({
  children,
  title,
  description,
  footer,
  size = "sm",
  placement = "top",
  overlayClassName = "bg-black/50",
  className,

  defaultOpen = false,
  open,
  onOpenChange,

  closeOnOverlayClick = true,
  closeOnEsc = true,
}: OnboardingTooltipProps) {
  const reactId = useId();
  const tooltipId = useMemo(() => `onboarding-tooltip-${reactId}`, [reactId]);

  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : uncontrolledOpen;

  const [pos, setPos] = useState<{
    top: number;
    left: number;
    arrowLeft: number;
  }>({ top: 0, left: 0, arrowLeft: 0 });

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // ESC to close
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEsc, setOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let raf = 0;

    const ARROW_SIZE = 16;
    const ARROW_OUTSET = ARROW_SIZE / 2;
    const TRIGGER_TO_CARD_GAP = 8;
    const OFFSET = TRIGGER_TO_CARD_GAP + ARROW_OUTSET;
    const VIEWPORT_PADDING = 12;

    const compute = () => {
      const trigger = triggerRef.current;
      const card = cardRef.current;
      if (!trigger || !card) return;

      const t = trigger.getBoundingClientRect();
      const c = card.getBoundingClientRect();

      const preferredLeft = t.left + t.width / 2 - c.width / 2;
      const left = clamp(
        preferredLeft,
        VIEWPORT_PADDING,
        window.innerWidth - c.width - VIEWPORT_PADDING
      );

      let top =
        placement === "top" ? t.top - c.height - OFFSET : t.bottom + OFFSET;

      if (placement === "top" && top < VIEWPORT_PADDING)
        top = t.bottom + OFFSET;
      if (
        placement === "bottom" &&
        top + c.height > window.innerHeight - VIEWPORT_PADDING
      ) {
        top = t.top - c.height - OFFSET;
      }

      const arrowCenterX = t.left + t.width / 2;
      const arrowLeft = clamp(arrowCenterX - left, 24, c.width - 24);

      setPos({
        top: top + window.scrollY,
        left: left + window.scrollX,
        arrowLeft,
      });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    schedule();

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);

    const card = cardRef.current;
    const ro =
      card && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => schedule())
        : null;

    if (card && ro) ro.observe(card);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      ro?.disconnect();
    };
  }, [isOpen, placement, size]);

  const cardClasses = [baseCardClasses, sizeClasses[size], className || ""]
    .filter(Boolean)
    .join(" ");

  const canPortal = typeof document !== "undefined";

  const overlay = (
    <div
      className={["fixed inset-0 z-40", overlayClassName].join(" ")}
      aria-hidden="true"
      onClick={() => {
        if (closeOnOverlayClick) setOpen(false);
      }}
    />
  );

  const tooltip = (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden={!isOpen}>
      <div
        ref={cardRef}
        id={tooltipId}
        role="dialog"
        aria-modal="true"
        className={cardClasses}
        style={{ position: "absolute", top: pos.top, left: pos.left }}>
        <div
          className="pointer-events-auto"
          onClick={(e) => e.stopPropagation()}>
          {(title || description) && (
            <div className="flex flex-col gap-2">
              {title && <div className={titleClasses}>{title}</div>}
              {description && <div className={descClasses}>{description}</div>}
            </div>
          )}

          {footer && <div className="mt-3">{footer}</div>}
        </div>

        {/* Arrow */}
        <div
          className="absolute w-4 h-4 bg-white rotate-45"
          style={{
            left: pos.arrowLeft - 8,
            ...(placement === "top" ? { bottom: -8 } : { top: -8 }),
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        aria-describedby={isOpen ? tooltipId : undefined}>
        {children}
      </span>

      {canPortal &&
        isOpen &&
        createPortal(
          <>
            {overlay}
            {tooltip}
          </>,
          document.body
        )}
    </>
  );
}

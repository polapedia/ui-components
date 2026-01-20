import { HTMLAttributes, ReactNode, useMemo, forwardRef } from "react";

type Orientation = "horizontal" | "vertical";
type Size = "sm" | "md";
export type StepStatus =
  | "completed"
  | "current"
  | "upcoming"
  | "disabled"
  | "error";

export interface StepItem {
  prefix?: string;
  leftIcon?: ReactNode;
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  activeIndex?: number;
  orientation?: Orientation;
  size?: Size;
  clickable?: boolean;
  onStepChange?: (index: number) => void;
  renderStep?: (step: StepItemWithDerivedStatus, index: number) => ReactNode;
}

export interface StepItemWithDerivedStatus extends StepItem {
  status: StepStatus;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

// Style Configuration
const sizeClasses: Record<
  Size,
  { prefix: string; label: string; description: string; gap: string }
> = {
  sm: {
    prefix: "text-xs",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-2",
  },
  md: {
    prefix: "text-sm",
    label: "text-[16px]",
    description: "text-[14px]",
    gap: "gap-3",
  },
};

const statusStyles: Record<
  StepStatus,
  {
    text: string;
    description: string;
    line: string;
  }
> = {
  completed: {
    text: "text-black",
    description: "text-black",
    line: "bg-primary-700",
  },
  current: {
    text: "text-neutral-900",
    description: "text-neutral-900",
    line: "bg-neutral-900",
  },
  upcoming: {
    text: "text-neutral-500",
    description: "text-neutral-500",
    line: "bg-neutral-300",
  },
  disabled: {
    text: "text-neutral-300",
    description: "text-neutral-300",
    line: "bg-neutral-200",
  },
  error: {
    text: "text-red-600",
    description: "text-red-500",
    line: "bg-red-500",
  },
};

// Helpers
function deriveStatus(
  step: StepItem,
  index: number,
  activeIndex: number | undefined
): StepStatus {
  if (step.status) return step.status;
  if (activeIndex == null) {
    return index === 0 ? "current" : "upcoming";
  }
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "current";
  return "upcoming";
}

// Main Component
const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    steps,
    activeIndex,
    orientation = "horizontal",
    size = "md",
    clickable = false,
    onStepChange,
    renderStep,
    className,
    ...rest
  },
  ref
) {
  const isHorizontal = orientation === "horizontal";

  const derivedSteps: StepItemWithDerivedStatus[] = useMemo(
    () =>
      steps.map((step, index) => ({
        ...step,
        status: deriveStatus(step, index, activeIndex),
        isFirst: index === 0,
        isLast: index === steps.length - 1,
        index,
      })),
    [steps, activeIndex]
  );

  const handleClick = (step: StepItemWithDerivedStatus) => {
    if (!clickable) return;
    if (step.status === "disabled") return;
    onStepChange?.(step.index);
  };

  return (
    <div
      ref={ref}
      className={`w-full flex ${
        isHorizontal ? "flex-row items-start" : "flex-col"
      } ${className || ""}`}
      {...rest}
    >
      {derivedSteps.map((step) => {
        if (renderStep) return renderStep(step, step.index);

        const sizeCfg = sizeClasses[size];
        const statusCfg = statusStyles[step.status];
        const isDisabled = step.status === "disabled";

        const interactiveClass =
          clickable && !isDisabled
            ? "cursor-pointer hover:opacity-80"
            : "cursor-default";

        // Container for Text & Prefix
        const StepWrapper = clickable ? "button" : "div";

        return (
          <div
            key={step.index}
            className={`flex items-center ${isHorizontal ? "" : "mb-4"} ${
              isHorizontal && !step.isLast ? "flex-1" : ""
            }`}
          >
            {/* Item Content: Prefix + Texts */}
            <StepWrapper
              className={`flex items-start text-left ${sizeCfg.gap} ${interactiveClass} group focus-visible:outline-none`}
              onClick={clickable ? () => handleClick(step) : undefined}
              type={clickable ? "button" : undefined}
              disabled={clickable ? isDisabled : undefined}
            >
              {/* Left Side: Prefix (+1) or Icon */}
              {(step.prefix || step.leftIcon) && (
                <span
                  className={`font-medium leading-none mt-1 ${sizeCfg.prefix} ${statusCfg.text}`}
                >
                  {step.prefix || step.leftIcon}
                </span>
              )}

              {/* Text Block */}
              <div className="flex flex-col">
                <span
                  className={`font-semibold leading-tight ${sizeCfg.label} ${statusCfg.text}`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span
                    className={`mt-1 font-normal leading-tight ${sizeCfg.description} ${statusCfg.description}`}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </StepWrapper>

            {/* CONNECTOR LINE */}
            {/* Render connector line for all steps except the last. */}
            {!step.isLast && (
              <div className={`flex-1 mx-4 flex items-center`}>
                <div
                  className={`h-0.5 w-full rounded-full transition-colors duration-300 ${statusCfg.line}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default Stepper;

import { HTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md";

export interface SimpleStepItem {
  prefix?: string;
  leftIcon?: ReactNode;
  label: string;
}

export interface SimpleStepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: SimpleStepItem[];
  activeIndex: number;
  size?: Size;
  activeColorClass?: string;
}

// Style
const sizeClasses: Record<
  Size,
  {
    textContainer: string;
    prefix: string;
    label: string;
    barHeight: string;
    gap: string;
    iconSize: string;
  }
> = {
  sm: {
    textContainer: "mb-3",
    prefix: "text-sm",
    label: "text-[14px]",
    barHeight: "h-[6px]",
    gap: "gap-2",
    iconSize: "w-5 h-5 text-sm",
  },
  md: {
    textContainer: "mb-3",
    prefix: "text-sm",
    label: "text-[14px]",
    barHeight: "h-[10px]",
    gap: "gap-2",
    iconSize: "w-5 h-5 text-sm",
  },
};

export default function SimpleStepper({
  steps,
  activeIndex,
  size = "md",
  activeColorClass = "bg-linear-to-b from-gradient-primary to-gradient-secondary",
  className,
  ...rest
}: SimpleStepperProps) {
  const safeIndex = Math.max(0, Math.min(activeIndex, steps.length - 1));
  const currentStep = steps[safeIndex];

  const sizeCfg = sizeClasses[size];

  return (
    <div className={`w-full flex flex-col ${className || ""}`} {...rest}>
      {/* Header: Active Step Icon + Text */}
      <div className={`flex items-center gap-2 ${sizeCfg.textContainer}`}>
        {/* Left Icon if exists */}
        {currentStep?.leftIcon && (
          <span
            className={`inline-flex items-center justify-center shrink-0 ${sizeCfg.iconSize}`}>
            {currentStep.leftIcon}
          </span>
        )}

        {/* Text Block */}
        <div className="flex items-baseline gap-2">
          {currentStep?.prefix && (
            <span className={`font-medium text-slate-500 ${sizeCfg.prefix}`}>
              {currentStep.prefix}
            </span>
          )}
          <span className={`font-bold text-slate-900 ${sizeCfg.label}`}>
            {currentStep?.label}
          </span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className={`flex w-full ${sizeCfg.gap}`}>
        {steps.map((_, index) => {
          const isActive = index <= activeIndex;

          return (
            <div
              key={index}
              className={`
                flex-1 rounded-full transition-colors duration-300
                ${sizeCfg.barHeight}
                ${isActive ? activeColorClass : "bg-neutral-500"}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}

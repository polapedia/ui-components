import React, { useEffect, useId, useMemo, useState } from "react";
import Button from "../button";
import CheckmarkIcon from "../icons/CheckmarkIcon";

type ModalSize = "sm" | "md" | "lg";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  size?: ModalSize;

  title: string;
  description?: string;
  label?: string;

  checkboxLabel?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  cancelText?: string;
  confirmText?: string;

  onCancel?: () => void;
  onConfirm?: () => void;

  // default: true
  closeOnBackdrop?: boolean;
};

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Modal({
  open,
  onOpenChange,
  size = "md",
  title,
  description,
  label,
  checkboxLabel = "Checkbox label",
  checked,
  onCheckedChange,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onCancel,
  onConfirm,
  closeOnBackdrop = true,
}: Props) {
  const titleId = useId();
  const labelId = useId();
  const descId = useId();
  const checkboxId = useId();
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  const showCheckbox = Boolean(checkboxLabel && onCheckedChange);
  const handleCheckedChange = (value: boolean) => {
    if (!isControlled) {
      setInternalChecked(value);
    }

    onCheckedChange?.(value);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  const sizeClasses = useMemo(() => {
    const container: Record<ModalSize, string> = {
      sm: "max-w-[280px] p-[24px] tab:max-w-[360px] desktop:max-w-[360px]",
      md: "max-w-[320px] p-[24px] tab:max-w-[500px] desktop:max-w-[500px]",
      lg: "max-w-[360px] p-[24px] tab:max-w-[720px] desktop:max-w-[720px]",
    };

    // Title typography
    const titleCls: Record<ModalSize, string> = {
      sm: "text-[16px] font-semibold text-black",
      md: "text-[18px] font-semibold text-black",
      lg: "text-[18px] font-semibold text-black",
    };

    const descCls: Record<ModalSize, string> = {
      sm: "text-[14px] font-normal text-black",
      md: "text-[16px] font-normal text-black",
      lg: "text-[16px] font-normal text-black",
    };

    const labelCls: Record<ModalSize, string> = {
      sm: "mt-[8px] mb-[16px] text-[14px] font-normal text-black",
      md: "mt-[8px] mb-[24px] text-[16px] font-normal text-black",
      lg: "mt-[8px] mb-[24px] text-[16px] font-normal text-black",
    };

    const containerClass = container[size] ?? container.md;
    const titleClass = titleCls[size] ?? titleCls.md;
    const descClass = descCls[size] ?? descCls.md;
    const labelClass = labelCls[size] ?? labelCls.md;

    return {
      container: containerClass,
      title: titleClass,
      desc: descClass,
      label: labelClass,
    };
  }, [size]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={() => {
          if (closeOnBackdrop) {
            onOpenChange(false);
          }
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={[
          "relative w-full",
          "bg-white rounded-xl shadow-lg",
          "mx-4",
          sizeClasses.container,
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h2 id={titleId} className={sizeClasses.title}>
              {title}
            </h2>
            <h4 id={labelId} className={sizeClasses.label}>
              {label}
            </h4>
          </div>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
            }}
            className="shrink-0 inline-flex items-center justify-center rounded-lg p-1 hover:bg-black/5 active:bg-black/10"
            aria-label="Close modal"
          >
            <XIcon className="size-5 text-black" />
          </button>
        </div>

        {/* Description */}
        {description ? (
          <p id={descId} className={sizeClasses.desc}>
            {description}
          </p>
        ) : null}

        {showCheckbox && (
          <div className="group flex items-start gap-x-2 w-full relative my-6 select-none">
            <div className="flex items-center justify-center shrink-0">
              <div className="relative flex items-center">
                <div className="group grid place-items-center">
                  {/* Input Checkbox */}
                  <input
                    type="checkbox"
                    id={checkboxId}
                    className={`
                      peer col-start-1 row-start-1 appearance-none border-[1.5px] shrink-0 
                      transition-all text-black border-black duration-200 ease-in-out
                      h-5 w-5 rounded-md bg-white checked:bg-linear-to-b checked:from-gradient-primary checked:to-gradient-secondary checked:border-0
                    `}
                    checked={currentChecked}
                    onChange={(e) => handleCheckedChange(e.target.checked)}
                  />
                  {/* SVG Icon (Checkmark) - Overlay */}
                  <CheckmarkIcon
                    className={`
                      pointer-events-none col-start-1 row-start-1 
                      w-3.5 h-3.5
                      self-center justify-self-center stroke-white 
                    `}
                  />
                </div>
              </div>
            </div>
            {/* Label Section */}
            <div className="flex flex-col select-none pt-0">
              <label
                htmlFor={checkboxId}
                className="text-[16px] leading-5 font-normal text-black cursor-pointer transition-colors"
              >
                {checkboxLabel}
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-3 ${!showCheckbox && "mt-6 desktop:mt-8"}`}
        >
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            className="text-accents-red"
          >
            {cancelText}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

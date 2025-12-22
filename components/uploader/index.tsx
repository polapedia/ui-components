import { ComponentProps, forwardRef, useState } from "react";
import UploadIcon from "../icons/UploadIcon";

type Variant = "compact" | "dropzone";

interface UploaderProps extends Omit<ComponentProps<"input">, "type"> {
  variant?: Variant;
  label?: string;
  helperText?: string;
}

const baseWrapperClasses =
  "relative w-full border border-content-secondary transition-all overflow-hidden bg-white hover:bg-background-hover";

const variantClasses: Record<Variant, string> = {
  compact: "h-[50px] flex items-center px-4 rounded-[12px]",
  dropzone:
    "h-[160px] px-6 flex flex-col items-center justify-center text-center gap-3 rounded-[16px]",
};

const disabledClasses =
  "bg-neutral-300 text-content-secondary cursor-not-allowed select-none border-gray-200";

const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
  (
    {
      variant = "compact",
      className,
      label,
      helperText,
      disabled,
      multiple,
      onChange,
      ...props
    },
    ref
  ) => {
    const [fileLabel, setFileLabel] = useState("Choose file");

    const wrapperClasses = [
      disabled ? disabledClasses : "cursor-pointer",
      baseWrapperClasses,
      variantClasses[variant],
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    const isCompact = variant === "compact";

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if (multiple && files.length > 1) {
          setFileLabel(`${files.length} files selected`);
        } else {
          setFileLabel(files[0].name);
        }
      } else {
        setFileLabel("Choose file");
      }

      onChange?.(e);
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-[14px] text-content-primary">{label}</label>
        )}

        <label className={wrapperClasses}>
          <input
            ref={ref}
            type="file"
            disabled={disabled}
            multiple={multiple}
            onChange={handleChange}
            className={[
              "absolute inset-0 w-full h-full opacity-0",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
            {...props}
          />

          {isCompact ? (
            <div className="flex flex-col pointer-events-none">
              <span className="text-[10px] text-content-secondary">
                Choose file
              </span>
              <span className="text-[14px] font-medium text-content-primary truncate max-w-[250px]">
                {fileLabel}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
              <UploadIcon className="w-10 h-10 text-content-secondary" />
              <span className="text-[14px] font-medium text-content-secondary">
                Select or drop your file here
              </span>
            </div>
          )}
        </label>

        {helperText && (
          <p className="text-[12px] text-content-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Uploader.displayName = "Uploader";

export default Uploader;

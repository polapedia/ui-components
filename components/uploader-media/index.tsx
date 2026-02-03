import { ComponentProps, forwardRef, useState } from 'react';
import UploadMediaIcon from '../icons/UploadMediaIcon';

interface UploaderMediaProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

const baseWrapperClasses =
  'relative flex flex-col items-center justify-center gap-2 w-[97px] h-[80px] border rounded-[12px] transition-all overflow-hidden bg-white hover:bg-gray-50';

const defaultBorderClasses = 'border-gray-200';
const errorBorderClasses = 'border-red-500 bg-red-50';
const disabledClasses =
  'bg-neutral-100 text-gray-400 cursor-not-allowed select-none border-gray-200';

const UploaderMedia = forwardRef<HTMLInputElement, UploaderMediaProps>(
  (
    {
      className,
      label = 'Choose File',
      helperText,
      disabled,
      multiple,
      onChange,
      error,
      ...props
    },
    ref
  ) => {
    const [fileLabel, setFileLabel] = useState(label);

    const wrapperClasses = [
      baseWrapperClasses,
      error ? errorBorderClasses : defaultBorderClasses,
      disabled ? disabledClasses : 'cursor-pointer',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if (multiple && files.length > 1) {
          setFileLabel(`${files.length} items`);
        } else {
          const name = files[0].name;
          setFileLabel(name.length > 12 ? name.substring(0, 9) + '...' : name);
        }
      } else {
        setFileLabel(label);
      }

      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        <label className={wrapperClasses}>
          <input
            ref={ref}
            type="file"
            disabled={disabled}
            multiple={multiple}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />

          <div className="flex flex-col items-center justify-center gap-2 pointer-events-none p-2 text-center">
            <UploadMediaIcon
              className={`w-6 h-6 ${
                disabled ? 'text-gray-300' : 'text-content-secondary'
              }`}
            />
            <span
              className={`text-[14px] font-normal leading-tight wrap-break-word ${
                disabled ? 'text-gray-400' : 'text-content-secondary'
              }`}
            >
              {fileLabel}
            </span>
          </div>
        </label>

        {helperText && (
          <p
            className={`text-[12px] ${
              error ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

UploaderMedia.displayName = 'UploaderMedia';

export default UploaderMedia;

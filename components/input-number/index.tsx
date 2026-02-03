import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Variant = 'default' | 'fill' | 'stroke';

export interface InputNumberProps extends Omit<
  ComponentProps<'input'>,
  'size' | 'type' | 'value' | 'onChange'
> {
  size?: Size;
  variant?: Variant;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (_value: number) => void;
}

const containerHeight: Record<Size, string> = {
  sm: 'h-[20px] rounded-[4px]',
  md: 'h-[24px] rounded-[4px]',
  lg: 'h-[32px] rounded-[8px]',
  xl: 'h-[40px] rounded-[12px]',
  '2xl': 'h-[48px] rounded-[12px]',
};

const fontSize: Record<Size, string> = {
  sm: 'text-[14px] font-bold',
  md: 'text-[16px] font-semibold',
  lg: 'text-[18px] font-semibold',
  xl: 'text-[20px] font-semibold',
  '2xl': 'text-[24px] font-semibold',
};

const circleButtonSize: Record<Size, string> = {
  sm: 'w-[16px] h-[16px]',
  md: 'w-[20px] h-[20px]',
  lg: 'w-[24px] h-[24px]',
  xl: 'w-[28px] h-[28px]',
  '2xl': 'w-[32px] h-[32px]',
};

const iconSize: Record<Size, string> = {
  sm: 'w-[14px] h-[14px]',
  md: 'w-[18px] h-[18px]',
  lg: 'w-[20px] h-[20px]',
  xl: 'w-[24px] h-[24px]',
  '2xl': 'w-[24px] h-[24px]',
};

const gapSize: Record<Size, string> = {
  sm: 'gap-[8px]',
  md: 'gap-[8px]',
  lg: 'gap-[8px]',
  xl: 'gap-[12px]',
  '2xl': 'gap-[12px]',
};

const defaultIconSize: Record<Size, string> = {
  sm: 'w-[10px] h-[10px]',
  md: 'w-[12px] h-[12px]',
  lg: 'w-[14px] h-[14px]',
  xl: 'w-[16px] h-[16px]',
  '2xl': 'w-[18px] h-[18px]',
};

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      size = 'md',
      variant = 'default',
      value,
      min,
      max,
      step = 1,
      disabled,
      className,
      id,
      name,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<string>(String(value));
    const localInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (isEditing && localInputRef.current) {
        localInputRef.current.focus();
        localInputRef.current.select();
      }
    }, [isEditing]);

    const clamp = (val: number) => {
      let next = val;
      if (typeof min === 'number') next = Math.max(next, min);
      if (typeof max === 'number') next = Math.min(next, max);
      return next;
    };

    const commitDraft = () => {
      if (disabled) return;
      const raw = Number(draft.trim());
      if (draft.trim() === '' || Number.isNaN(raw)) {
        setDraft(String(value));
      } else {
        onChange?.(clamp(raw));
      }
      setIsEditing(false);
    };

    const handleDecrease = () =>
      !disabled && onChange?.(clamp(value - (Number(step) || 1)));
    const handleIncrease = () =>
      !disabled && onChange?.(clamp(value + (Number(step) || 1)));

    const minusIsDisabled =
      disabled || (typeof min === 'number' && value <= min);
    const plusIsDisabled =
      disabled || (typeof max === 'number' && value >= max);

    const getContainerStyles = () => {
      const base =
        'inline-flex items-center justify-between select-none transition-all';
      const height = containerHeight[size];
      const gap = gapSize[size];

      switch (variant) {
        case 'fill':
          return `${base} bg-neutral-500 px-2 ${height} ${gap}`;
        case 'stroke':
          return `${base} border border-neutral-500 px-2 ${height} ${gap}`;
        default:
          return `${base} gap-3`;
      }
    };

    const getButtonStyles = (isDisabled: boolean) => {
      const base = 'flex items-center justify-center transition-all shrink-0';

      if (variant === 'default') {
        const circle = circleButtonSize[size];
        const state = isDisabled
          ? 'bg-neutral-500 text-neutral-700 cursor-not-allowed border-transparent'
          : 'bg-white text-primary-600 border border-primary-600 cursor-pointer active:scale-90';
        return `${base} ${circle} rounded-full ${state}`;
      }

      if (variant === 'stroke') {
        const circle = circleButtonSize[size];
        const state = isDisabled
          ? 'bg-tranparent text-neutral-500 cursor-not-allowed '
          : 'bg-white text-content-primary cursor-pointer active:scale-90';
        return `${base} ${circle} rounded-full ${state}`;
      }

      return `${base} cursor-pointer text-white disabled:text-background-disabled disabled:cursor-not-allowed active:scale-90`;
    };

    const getValueColor = () => {
      if (disabled) return 'text-neutral-500';
      if (variant === 'fill') return 'text-white';
      if (variant === 'stroke') return 'text-content-primary';
      return 'text-black';
    };

    return (
      <div className={`${getContainerStyles()} ${className || ''}`}>
        {/* Minus Button */}
        <button
          type="button"
          disabled={minusIsDisabled}
          onClick={handleDecrease}
          className={getButtonStyles(minusIsDisabled)}
        >
          <MinusIcon
            className={
              variant === 'default' ? defaultIconSize[size] : iconSize[size]
            }
            strokeWidth={1.5}
          />
        </button>

        {/* Value Display / Input */}
        <div
          className={`relative flex-1 text-center min-w-5 ${fontSize[size]}`}
        >
          {!isEditing ? (
            <span
              className={`block ${getValueColor()} ${disabled ? 'cursor-not-allowed' : 'cursor-text'}`}
              onClick={() => !disabled && setIsEditing(true)}
            >
              {value}
            </span>
          ) : (
            <input
              ref={(node) => {
                localInputRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref)
                  (ref as React.RefObject<HTMLInputElement | null>).current =
                    node;
              }}
              id={inputId}
              name={name}
              type="number"
              inputMode="numeric"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitDraft}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitDraft();
                if (e.key === 'Escape') {
                  setDraft(String(value));
                  setIsEditing(false);
                }
              }}
              className={`w-full bg-transparent text-center outline-none p-0 ${getValueColor()}`}
              {...rest}
            />
          )}
        </div>

        {/* Plus Button */}
        <button
          type="button"
          disabled={plusIsDisabled}
          onClick={handleIncrease}
          className={getButtonStyles(plusIsDisabled)}
        >
          <PlusIcon
            className={
              variant === 'default' ? defaultIconSize[size] : iconSize[size]
            }
            strokeWidth={1.5}
          />
        </button>
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';
export default InputNumber;

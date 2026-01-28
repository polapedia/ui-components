import { HTMLAttributes, useState } from 'react';
import StarIcon from '../icons/StarIcon';

export interface StarRatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // current rating
  max?: number; // total stars
  interactive?: boolean;
  onValueChange?: (_value: number) => void;
  starSize?: number;
}

const COLOR_INACTIVE = '#ADB5BD';
const COLOR_ACTIVE = '#FFCC00';

export default function StarRating({
  value,
  max = 5,
  interactive = false,
  onValueChange,
  className,
  starSize = 24,
  ...rest
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const safeValue = Math.max(0, Math.min(value, max));
  const displayValue = hoverValue ?? safeValue;

  return (
    <div className={`flex gap-x-1 ${className || ''}`} {...rest}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= displayValue;
        const color = isActive ? COLOR_ACTIVE : COLOR_INACTIVE;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => {
              if (!interactive) return;
              onValueChange?.(starValue);
            }}
            onMouseEnter={() => {
              if (!interactive) return;
              setHoverValue(starValue);
            }}
            onMouseLeave={() => {
              if (!interactive) return;
              setHoverValue(null);
            }}
            className={`
              inline-flex items-center justify-center
              w-6 h-6
              ${interactive ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            <StarIcon
              style={{
                width: starSize,
                height: starSize,
                color,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

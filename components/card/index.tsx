import { HTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';
import StarRating from '../rating';
import Button from '../button';

export type CardVariant = 'product' | 'simple';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  title: string;
  subtitle?: string;
  description?: string;
  topIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Product Variant Props
  rating?: number;
  imageSrc?: string;
  imageAlt?: string;
  imageHeightClassName?: string;

  // Interactive Props
  ratingInteractive?: boolean;
  onRatingChange?: (_value: number) => void;
  onButtonClick?: () => void;
  buttonText?: string;
}

export default function Card({
  variant = 'product',
  title,
  subtitle,
  description,
  rightIcon,
  topIcon,
  rating = 0,
  imageSrc,
  imageAlt = 'Product Image',
  imageHeightClassName = 'h-[250px]',
  ratingInteractive = false,
  onRatingChange,
  onButtonClick,
  buttonText = 'View Product',
  className,
  ...rest
}: CardProps) {
  const isProduct = variant === 'product';

  if (!isProduct) {
    return (
      <div
        className={`relative flex flex-col justify-between px-4 tab:px-6 rounded-2xl tab:rounded-[50px] bg-linear-to-b from-gradient-primary to-gradient-secondary text-white ${
          className || ''
        }`}
        {...rest}
      >
        <div className="mt-12 tab:mt-[130px] desktop:mt-[164px]">
          {topIcon && (
            <div className="flex items-center justify-center w-8 h-8 tab:w-14 tab:h-14 bg-white rounded-full text-[#323232] font-bold text-sm shadow-md">
              {topIcon}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[16px] tab:text-[24px] desktop:text-[32px] font-bold my-3">
            {title}
          </h3>
          {description && (
            <p className="text-sm mb-12 tab:text-[18px] tab:mb-[130px] desktop:text-[24px] desktop:mb-[168px] font-normal opacity-90">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl bg-white shadow-md border border-neutral-100 flex flex-col ${
        className || ''
      }`}
      {...rest}
    >
      <div
        className={`relative w-full ${imageHeightClassName} rounded-2xl overflow-hidden mb-6 bg-neutral-200`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="w-full h-full bg-neutral-400 animate-pulse" />
        )}
      </div>

      {topIcon && (
        <div className="mb-3">
          <div className="flex items-center justify-center w-6 h-6 tab:w-14 tab:h-14 bg-linear-to-b from-gradient-primary to-gradient-secondary rounded-full text-white font-bold text-sm shadow-sm">
            {topIcon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[16px] tab:text-[24px] desktop:text-[32px] text-neutral-900 line-clamp-1">
              {title}
            </h3>
          </div>

          <StarRating
            value={rating}
            starSize={48}
            interactive={ratingInteractive}
            onValueChange={onRatingChange}
          />
        </div>

        <div className="mt-6">
          {subtitle && (
            <p className="font-medium text-sm tab:text-[18px] desktop:text-[24px] text-black line-clamp-1">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="font-normal text-sm tab:text-[18px] desktop:text-[24px] text-black line-clamp-2 mt-2">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Footer: Button & Badge */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={onButtonClick}
          className="tab:text-[20px]! tab:px-5! tab:h-[58px]: tab:py-3! tab:rounded-xl!"
        >
          {buttonText}
        </Button>

        {rightIcon && (
          <div className="shrink-0 flex items-center justify-center w-6 h-6 tab:w-10 tab:h-10 bg-linear-to-b from-gradient-primary to-gradient-secondary rounded-full text-white font-bold text-sm shadow-sm">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

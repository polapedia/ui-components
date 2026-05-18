import { cn } from '@/utils/cn';
import {
  CartIcon,
  HeartIcon,
  LocationOutlineIcon,
  StarRating,
  VerifiedIcon,
} from '@/lib';
import Button from '../../button';
import { productStyles } from '../styles/product';
import type { ProductCardProps } from '../types';

export default function ProductCard(props: ProductCardProps) {
  const {
    title,
    subtitle,
    description,
    rightIcon,
    topIcon,
    className,
    size = 'md',
    layout = 'default',
    rating = 0,
    imageAlt = 'Product Image',
    ratingInteractive = false,
    imagesrc,
    onRatingChange,
    onButtonClick,
    buttontext = 'View Product',
    titleClassName,
    subTitleClassName,
    descriptionClassName,
    imageHeightClassName,
    topBadge,
    price,
    metaText,
    imageHeight,
    isVerified,
    wishlistIcon,
    isWishlisted = false,
    onWishlistClick,
    locationName,
    onProductClick,
    showActionIcon,
    actionIcon,
    onActionClick,
    ...rest
  } = props;

  const style = productStyles[size];

  if (layout === 'marketplace') {
    return (
      <div
        className={cn(
          'relative bg-white shadow-lg border border-neutral-100 flex flex-col p-4 rounded-2xl',
          className
        )}
        {...rest}
      >
        {/* Image */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden mb-4 bg-neutral-100 ${imageHeight || 'h-39.5'}`}
        >
          {imagesrc ? (
            <img
              src={imagesrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 animate-pulse" />
          )}

          {/* Badge */}
          {topBadge && (
            <div className="absolute top-4 left-4 z-10">
              <Button shape="pill" size="sm" variant="primary">
                {topBadge}
              </Button>
            </div>
          )}

          {(showActionIcon || actionIcon || onActionClick) && (
            <button
              type="button"
              onClick={onActionClick}
              className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-linear-to-b from-gradient-primary to-gradient-secondary text-white shadow-md flex items-center justify-center transition-transform cursor-pointer"
            >
              {actionIcon ?? <CartIcon className="w-5 h-5" />}
            </button>
          )}
        </div>

        <div className="px-1">
          {/* Title + Wishlist */}
          <div className="flex items-center justify-between">
            <h3
              className={`text-xl font-bold text-neutral-900 leading-tight cursor-pointer line-clamp-1 ${style.title} ${titleClassName || ''}`}
              onClick={onProductClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onProductClick?.()}
            >
              {title}
            </h3>

            <button
              type="button"
              onClick={onWishlistClick}
              className={`shrink-0 transition-all`}
            >
              {wishlistIcon || (
                <HeartIcon
                  className={`w-6 h-6 cursor-pointer ${
                    isWishlisted
                      ? 'text-red-500 border border-none'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          </div>
          {price && (
            <p className="text-sm font-medium text-black mt-1">
              Rp {new Intl.NumberFormat('id-ID').format(parseInt(price, 10))}
            </p>
          )}
          {/* Rating & Meta */}
          <div className="mt-1 flex items-center text-sm text-content-secondary">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="ml-2 mr-3">{rating.toFixed(1)}</span>
            {metaText && (
              <span className={`ml-0 ${style.meta}`}>{metaText}</span>
            )}
          </div>

          {/* Subtitle / Footer Card */}
          {subtitle && (
            <div className="mt-4 flex items-end justify-between">
              <p className="text-sm text-content-secondary leading-relaxed ">
                {subtitle}
              </p>
              {!locationName && isVerified && (
                <div className="shrink-0 ml-2">
                  <VerifiedIcon className="w-5.5 h-5.5" />
                </div>
              )}
            </div>
          )}

          {/* Location Detail */}
          {locationName && (
            <div className="flex mt-4 items-center justify-between">
              <div className="flex items-center">
                <LocationOutlineIcon className="w-6 h-6" />
                <div>
                  <p className="text-sm text-content-secondary">
                    {locationName}
                  </p>
                </div>
              </div>
              {isVerified && (
                <div className="shrink-0 ml-2">
                  <VerifiedIcon className="w-5.5 h-5.5" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-neutral-100 bg-white shadow-md',
        style.cardPadding,
        style.container,
        className
      )}
      {...rest}
    >
      <div
        className={`relative mb-6 w-full overflow-hidden rounded-2xl bg-neutral-200 lg:min-h-65 ${
          imageHeightClassName || style.imageHeight
        }`}
      >
        {imagesrc ? (
          <img
            src={imagesrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-neutral-400" />
        )}
      </div>

      {topIcon && (
        <div className="mb-3">
          <div className={style.topIcon}>{topIcon}</div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between">
            <h3 className={`${style.title} ${titleClassName || ''}`}>
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
            <p className={`${style.subtitle} ${subTitleClassName || ''}`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`${style.description} ${descriptionClassName || ''}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="primary"
          size={size === 'sm' || size === 'md' || size === 'lg' ? 'md' : 'lg'}
          onClick={onButtonClick}
        >
          {buttontext}
        </Button>

        {rightIcon && (
          <div className={`shrink-0 ${style.rightIcon}`}>{rightIcon}</div>
        )}
      </div>
    </div>
  );
}

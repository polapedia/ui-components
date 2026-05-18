import { cn } from '@/utils/cn';
import { StarIcon, ThumbUpOffIcon, VerifiedBadgeIcon } from '@/lib';
import Button from '../../button';
import { marketplaceReviewStyles } from '../styles/marketplace-review';
import type { MarketplaceReviewCardProps } from '../types';

export default function MarketplaceReviewCard(
  props: MarketplaceReviewCardProps
) {
  const {
    size = 'md', // default md
    authorName,
    authorImageSrc,
    authorImageAlt = 'Author',
    isVerified = false,
    rating = 5,
    reviewDate,
    reviewText,
    reviewImages = [],
    productImageSrc,
    productImageAlt = 'Product',
    productName,
    productPrice,
    onViewProduct,
    viewProductLabel = 'Lihat Desain',
    sellerResponse,
    sellerResponseLabel = 'Respon Penjual',
    sellerResponseDelay,
    helpfulCount,
    helpfulIcon,
    onHelpfulClick,
    onReport,
    reportLabel = 'Laporkan Ulasan',
    className = '',
    ...rest
  } = props;

  const s = marketplaceReviewStyles[size];
  const starsCount = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className={cn(s.container, className)} {...rest}>
      {/* Header: author + date */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {authorImageSrc ? (
            <img
              src={authorImageSrc}
              alt={authorImageAlt}
              width={s.avatarSize.w}
              height={s.avatarSize.h}
              className={cn('shrink-0', s.avatar)}
              style={{ width: s.avatarSize.w, height: s.avatarSize.h }}
            />
          ) : (
            <div
              className={cn(
                'shrink-0 flex items-center justify-center rounded-full bg-neutral-200 font-bold text-neutral-500',
                s.avatarFallback
              )}
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <span className={s.authorName}>{authorName}</span>
            {isVerified && <VerifiedBadgeIcon className="w-4 h-4" />}
          </div>
        </div>

        {reviewDate && (
          <span className={cn('shrink-0', s.reviewDate)}>{reviewDate}</span>
        )}
      </div>

      {/* Stars */}
      <div className={cn('flex items-center', s.starsGap)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={cn(
              s.star,
              index < starsCount ? 'text-yellow-400' : 'text-neutral-200'
            )}
          />
        ))}
      </div>

      {/* Review text */}
      {reviewText && <p className={s.reviewText}>{reviewText}</p>}

      {/* Review images */}
      {reviewImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {reviewImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'shrink-0 overflow-hidden bg-neutral-100',
                s.reviewImageBox
              )}
            >
              <img
                src={image.src}
                alt={image.alt || `Review image ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Reviewed product */}
      {(productName || productPrice || productImageSrc) && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-3">
          <div className="flex items-center gap-3">
            {productImageSrc && (
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={productImageSrc}
                  alt={productImageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-col">
              {productName && (
                <span className={cn('line-clamp-1', s.productName)}>
                  {productName}
                </span>
              )}
              {productPrice && (
                <span className={s.productPrice}>{productPrice}</span>
              )}
            </div>
          </div>

          {onViewProduct && (
            <button
              type="button"
              onClick={onViewProduct}
              className={cn(
                'flex shrink-0 items-center gap-1 text-black transition-colors hover:text-neutral-900',
                s.viewProductLabel
              )}
            >
              {viewProductLabel}
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Seller response */}
      {sellerResponse && (
        <div className="flex flex-col gap-1 rounded-r-xl border-l-4 border-[#B31F26] bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-[#B31F26] font-semibold',
                s.sellerResponseLabel
              )}
            >
              {sellerResponseLabel}
            </span>
            {sellerResponseDelay && (
              <span
                className={cn(
                  'text-[#5A403E] font-normal',
                  s.sellerResponseLabel
                )}
              >
                {sellerResponseDelay}
              </span>
            )}
          </div>
          <p className={`text-content-secondary ${s.sellerResponseText}`}>
            &ldquo;{sellerResponse}&rdquo;
          </p>
        </div>
      )}

      {(helpfulCount !== undefined || onReport) && (
        <div className="flex items-center justify-between border-t border-neutral-100 pt-1">
          {helpfulCount !== undefined ? (
            <button
              type="button"
              onClick={onHelpfulClick}
              className={cn(
                'flex items-center gap-2 text-content-primary transition-colors hover:text-neutral-900',
                s.helpfulText
              )}
            >
              {helpfulIcon || <ThumbUpOffIcon />}
              <span>{helpfulCount} orang terbantu</span>
            </button>
          ) : (
            <div />
          )}

          {onReport && (
            <Button variant="secondary" size="md" className="cursor-pointer">
              {reportLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

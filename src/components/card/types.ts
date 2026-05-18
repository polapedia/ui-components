import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant =
  | 'product'
  | 'simple'
  | 'review'
  | 'marketplace-review';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardProductSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CardReviewSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type CardMarketplaceReviewSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProductLayout = 'default' | 'marketplace';

export type BaseProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  description?: string;
  topIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
};

export type SimpleCardProps = BaseProps & {
  variant: 'simple';
  size?: CardSize;
};

export type ProductCardProps = BaseProps & {
  variant?: 'product';
  size?: CardProductSize;
  layout?: ProductLayout;
  rating?: number;
  imagesrc?: string;
  imageAlt?: string;
  imageHeightClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  descriptionClassName?: string;
  ratingInteractive?: boolean;
  onRatingChange?: (_value?: number) => void;
  onButtonClick?: () => void;
  buttontext?: string;

  // marketplace props
  topBadge?: string | ReactNode;
  price?: string;
  metaText?: string;
  imageHeight?: string;
  isVerified?: boolean;
  wishlistIcon?: ReactNode;
  isWishlisted?: boolean;
  locationName?: string;
  onWishlistClick?: () => void;
  onProductClick?: () => void;
  showActionIcon?: boolean;
  actionIcon?: ReactNode;
  onActionClick?: () => void;
};

export type ReviewCardProps = BaseProps & {
  variant: 'review';
  size?: CardReviewSize;
  rating?: number;
  author?: string;
  role?: string;
  starSize?: string;
  userImageSrc?: string;
  userImageAlt?: string;
};

export type MarketplaceReviewCardProps = HTMLAttributes<HTMLDivElement> & {
  variant: 'marketplace-review';
  size?: CardMarketplaceReviewSize;
  title?: string;

  // Author
  authorName: string;
  authorImageSrc?: string;
  authorImageAlt?: string;
  isVerified?: boolean;

  // Review content
  rating?: number;
  reviewDate?: string;
  reviewText?: string;
  reviewImages?: { src: string; alt?: string }[];

  // Reviewed product
  productImageSrc?: string;
  productImageAlt?: string;
  productName?: string;
  productPrice?: string;
  onViewProduct?: () => void;
  viewProductLabel?: string;

  // Seller response
  sellerResponse?: string;
  sellerResponseLabel?: string;
  sellerResponseDelay?: string;

  // Footer
  helpfulCount?: number;
  helpfulIcon?: ReactNode;
  onHelpfulClick?: () => void;
  onReport?: () => void;
  reportLabel?: string;

  className?: string;
};

export type CardProps =
  | SimpleCardProps
  | ProductCardProps
  | ReviewCardProps
  | MarketplaceReviewCardProps;

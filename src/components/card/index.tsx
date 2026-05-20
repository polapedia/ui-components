import type {
  CardProps,
  SimpleCardProps,
  ReviewCardProps,
  MarketplaceReviewCardProps,
  ProductCardProps,
} from './types';
import MarketplaceReviewCard from './variants/MarketplaceReviewCard';
import ProductCard from './variants/ProductCard';
import ReviewCard from './variants/ReviewCard';
import SimpleCard from './variants/SimpleCard';

export type * from './types';

export default function Card(props: CardProps) {
  switch (props.variant) {
    case 'simple':
      return <SimpleCard {...(props as SimpleCardProps)} />;
    case 'review':
      return <ReviewCard {...(props as ReviewCardProps)} />;
    case 'marketplace-review':
      return (
        <MarketplaceReviewCard {...(props as MarketplaceReviewCardProps)} />
      );
    case 'product':
    default:
      return <ProductCard {...(props as ProductCardProps)} />;
  }
}

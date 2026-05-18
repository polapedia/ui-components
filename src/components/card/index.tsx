import type { CardProps } from './types';
import MarketplaceReviewCard from './variants/MarketplaceReviewCard';
import ProductCard from './variants/ProductCard';
import ReviewCard from './variants/ReviewCard';
import SimpleCard from './variants/SimpleCard';

export type * from './types';

export default function Card(props: CardProps) {
  switch (props.variant) {
    case 'simple':
      return <SimpleCard {...props} />;

    case 'review':
      return <ReviewCard {...props} />;

    case 'marketplace-review':
      return <MarketplaceReviewCard {...props} />;

    case 'product':
    default:
      return <ProductCard {...props} />;
  }
}

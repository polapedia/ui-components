import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from '.';
import HomeIcon from '../icons/HomeIcon';
import PlusOneIcon from '../icons/PlusOneIcon';
import UserImage from '@/assets/images/user.webp';

const icons = {
  None: null,
  Home: <HomeIcon className="w-4 h-4 tab:w-6 tab:h-6" />,
  PlusOne: <PlusOneIcon className="w-3 h-3 tab:w-4 tab:h-4" />,
};

const meta: Meta<typeof Card> = {
  title: 'Design System/Display/Card',
  component: Card,
  args: {
    title: 'Tittle',
    subtitle: 'Secondary Text',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    rating: 4,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['product', 'simple', 'review', 'marketplace-review'],
      description: 'Card display variations',
    },
    topIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    onButtonClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const ProductDefault: Story = {
  args: {
    variant: 'product',
    topIcon: icons.Home,
    buttontext: 'View Product',
    className: 'w-full',
    rightIcon: icons.PlusOne,
    imagesrc: '/images/house.jpeg',
    isVerified: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export const SimpleDefault: Story = {
  args: {
    variant: 'simple',
    topIcon: icons.Home,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    subtitle: undefined,
  },
  decorators: [
    (Story) => (
      <div className="h-full">
        <Story />
      </div>
    ),
  ],
};

export const ReviewDefault: Story = {
  args: {
    variant: 'review',
    title: 'POLO AI menyelamatkan waktuku',
    description: 'POLO AI telah sepenuhnya mengubah alur kerja saya.',
    rating: 5,
    author: 'John Doe',
    role: 'Drafter',
    userImageSrc: UserImage,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const MarketplaceReviewDefault: Story = {
  args: {
    variant: 'marketplace-review',
    authorName: 'John Doe',
    authorImageSrc: UserImage,
    isVerified: true,
    rating: 4.5,
    reviewDate: '5 Februari 2026',
    reviewText: 'This property exceeded my expectations. Highly recommended!',
    productName: 'Luxury Villa',
    productPrice: 'Rp 1.000.000',
    productImageSrc: '/images/house.jpeg',
    sellerResponse: 'Thank you for your feedback!',
    sellerResponseDelay: '3 hari kemudian',
    sellerResponseLabel: 'Respon penjual',
    viewProductLabel: 'Lihat Desain',
    helpfulCount: 12,
    reportLabel: 'Laporkan Ulasan',
    onReport: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

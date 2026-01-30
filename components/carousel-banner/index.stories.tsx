import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CarouselBanner, { BannerSlide } from '.';

const meta: Meta<typeof CarouselBanner> = {
  title: 'Design System/Display/Carousel Banner',
  component: CarouselBanner,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    autoPlay: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
    interval: {
      control: { type: 'number' },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['inside', 'outside'],
      },
    },
  },
  args: {
    autoPlay: false,
    interval: 3000,
    variant: 'inside',
  },
};

export default meta;

type Story = StoryObj<typeof CarouselBanner>;

const mockSlides: BannerSlide[] = [
  {
    id: 1,
    imageSrc: '/images/banner.png',
    linkUrl: '#',
    altText: 'Promo Diskon 50%',
  },
  {
    id: 2,
    imageSrc: '/images/banner.png',
    linkUrl: '#',
    altText: 'Promo Merdeka',
  },
  {
    id: 3,
    imageSrc: '/images/banner.png',
    linkUrl: '#',
    altText: 'Cluster Baru',
  },
];

export const VariantOutside: Story = {
  args: {
    slides: mockSlides,
    variant: 'outside',
  },
};

export const VariantInside: Story = {
  args: {
    slides: mockSlides,
    variant: 'inside',
  },
};

export const Autoplay: Story = {
  args: {
    slides: mockSlides,
    variant: 'inside',
    autoPlay: true,
    interval: 3000,
  },
};

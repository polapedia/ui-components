import { useState, useEffect, useCallback } from 'react';
import CarouselIndicator from '../carousel-indicator';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Image from 'next/image';
import Link from 'next/link';

export type BannerVariant = 'inside' | 'outside';

export interface BannerSlide {
  id: string | number;
  imageSrc: string;
  linkUrl: string;
  altText?: string;
}

interface CarouselBannerProps {
  slides: BannerSlide[];
  variant?: BannerVariant;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

type FooterContentProps = {
  variant: BannerVariant;
  slides: BannerSlide[];
  current: number;
  onDotClick: (_index: number) => void;
};

function FooterContent({
  variant,
  slides,
  current,
  onDotClick,
}: FooterContentProps) {
  const isInside = variant === 'inside';

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href={slides[current]?.linkUrl}
        className={`md:text-[12px] text-[6px] font-medium transition-all ${
          isInside
            ? 'rounded-full bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-accents-blue shadow-md hover:bg-gray-50'
            : 'text-accents-blue hover:text-accents-blue/80 hover:underline'
        }`}
      >
        Lihat Semua
      </Link>

      <div
        className={`${
          isInside
            ? 'flex items-center rounded-full bg-white px-1 md:px-3 py-1 md:py-2.5 shadow-md'
            : ''
        }`}
      >
        <CarouselIndicator
          total={slides.length}
          activeIndex={current}
          onActiveChange={onDotClick}
          size="md"
          className={isInside ? '[&_span]:bg-gray-200' : '[&_span]:bg-gray-300'}
        />
      </div>
    </div>
  );
}

export default function CarouselBanner({
  slides,
  variant = 'outside',
  autoPlay = false,
  interval = 5000,
  className = '',
}: CarouselBannerProps) {
  const [current, setCurrent] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handleDotClick = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, slides.length]);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="group relative w-full aspect-3/1 md:h-[300px] lg:h-[350px] md:aspect-auto overflow-hidden rounded-2xl md:rounded-4xl shadow-lg transition-all hover:shadow-xl bg-gray-100">
        {/* Slider Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-full min-w-full">
              <Image
                src={slide.imageSrc}
                alt={slide.altText || 'Banner image'}
                className="object-fill lg:object-cover"
                fill
                priority={current === 0}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-neutral-500 hover:bg-neutral-600 p-1 md:p-2 text-white opacity-0 transition-all group-hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ArrowLeftIcon className="h-3 w-3 md:h-6 md:w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="sm:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-neutral-500 hover:bg-neutral-600 p-1 md:p-2 text-white opacity-0 transition-all group-hover:opacity-100"
          aria-label="Next Slide"
        >
          <ArrowRightIcon className="h-3 w-3 md:h-6 md:w-6" />
        </button>

        {/* Footer Content (Inside Variant) */}
        {variant === 'inside' && (
          <div className="absolute bottom-2 md:bottom-6 left-0 w-full px-1.5 md:px-5 lg:px-6 z-10">
            <FooterContent
              variant={variant}
              slides={slides}
              current={current}
              onDotClick={handleDotClick}
            />
          </div>
        )}
      </div>

      {/* Footer Content (Outside Variant) */}
      {variant === 'outside' && (
        <div className="mt-4 px-1">
          <FooterContent
            variant={variant}
            slides={slides}
            current={current}
            onDotClick={handleDotClick}
          />
        </div>
      )}
    </div>
  );
}

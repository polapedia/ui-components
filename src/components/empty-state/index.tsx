import Button from '../button';
import CloseIcon from '../icons/CloseIcon';

type Size = 'sm' | 'md' | 'lg';
type Layout = 'default' | 'horizontal' | 'card';

type EmptyStateProps = {
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  layout?: Layout;
  size?: Size;
  className?: string;
};

export default function EmptyState({
  title = 'Title goes here maximum 2 lines but please make it short',
  description = 'Empty state description goes here.',
  primaryButtonLabel = 'Button Label',
  secondaryButtonLabel = 'Button Label',
  onPrimaryClick,
  onSecondaryClick,
  onClose,
  layout = 'default',
  size = 'md',
  className = '',
}: EmptyStateProps) {
  const isCard = layout === 'card';
  const isHorizontal = layout === 'horizontal';

  const cardContainerClasses: Record<Size, string> = {
    sm: 'px-[16px] py-[24px] max-w-[392px]',
    md: 'px-[32px] py-[24px] max-w-[552px]',
    lg: 'px-[32px] py-[24px] max-w-[552px]',
  };

  const horizontalContainerClasses: Record<Size, string> = {
    sm: 'gap-x-4 max-w-[471px]',
    md: 'gap-x-6 max-w-[800px]',
    lg: 'gap-x-8 max-w-[928px]',
  };

  const defaultContainerClasses: Record<Size, string> = {
    sm: 'max-w-[275px]',
    md: 'max-w-[488px]',
    lg: 'max-w-[488px]',
  };

  const containerClasses = [
    'w-full transition-all duration-300',

    isCard &&
      `relative bg-white rounded-2xl shadow-lg border border-neutral-200 ${cardContainerClasses[size]}`,
    isHorizontal &&
      `flex flex-row items-center ${horizontalContainerClasses[size]}`,

    !isCard &&
      !isHorizontal &&
      `flex flex-col items-center ${defaultContainerClasses[size]} mx-auto text-center`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const titleClasses: Record<Size, string> = {
    sm: 'text-[18px]',
    md: 'text-[32px]',
    lg: 'text-[32px]',
  };

  const descriptionClasses: Record<Size, string> = {
    sm: 'text-[16px] mt-2 mb-4',
    md: 'text-[18px] my-4',
    lg: 'text-[18px] mt-4 mb-6',
  };

  const imageSizes: Record<
    Layout,
    Record<Size, { width: number; height: number }>
  > = {
    card: {
      sm: { width: 256, height: 210 },
      md: { width: 360, height: 295 },
      lg: { width: 480, height: 394 },
    },
    horizontal: {
      sm: { width: 180, height: 148 },
      md: { width: 288, height: 236 },
      lg: { width: 408, height: 335 },
    },
    default: {
      sm: { width: 256, height: 210 },
      md: { width: 360, height: 295 },
      lg: { width: 380, height: 312 },
    },
  };

  const resolvedLayout: Layout = isCard
    ? 'card'
    : isHorizontal
      ? 'horizontal'
      : 'default';

  const imageSize = imageSizes[resolvedLayout][size];

  return (
    <div className={containerClasses}>
      {isCard && onClose && (
        <button
          onClick={onClose}
          className="absolute top-7 right-5 md:top-6 md:right-6 text-neutral-400 hover:text-neutral-600 transition-colors p-1 z-10"
          aria-label="Close"
        >
          <CloseIcon className="w-3.5 h-3.5 text-[#323232] hover:text-[#323232]/70 transition-colors" />
        </button>
      )}

      <div
        className={[
          'relative shrink-0 flex justify-center',
          !isHorizontal && 'mb-6 md:mb-6',
          isHorizontal && 'mb-4 md:mb-0',
          isCard && 'mt-4 md:mt-2',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <img
          src="/images/notfound.png"
          alt="Illustration"
          width={imageSize.width}
          height={imageSize.height}
        />
      </div>

      <section
        className={[
          'flex flex-col',
          isHorizontal
            ? 'text-center md:text-left items-center md:items-start flex-1'
            : 'text-center items-center',
        ].join(' ')}
      >
        <h3
          className={[
            'font-bold text-black leading-[140%]',
            titleClasses[size],
          ].join(' ')}
        >
          {title}
        </h3>

        <p
          className={[
            'text-black font-normal leading-[140%]',
            descriptionClasses[size],
          ].join(' ')}
        >
          {description}
        </p>

        {isCard && (
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <div className="w-auto">
              <Button
                variant="tertiary"
                size="md"
                onClick={onSecondaryClick}
                className="justify-center"
              >
                {secondaryButtonLabel}
              </Button>
            </div>
            <div className="w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={onPrimaryClick}
                className="justify-center"
              >
                {primaryButtonLabel}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

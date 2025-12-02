import Image from "next/image";
import Button from "../button";
import CloseIcon from "../icons/CloseIcon";

type Layout = "default" | "horizontal" | "card";

type EmptyStateProps = {
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  layout?: Layout;
  className?: string;
};

export default function EmptyState({
  title = "Title goes here maximum 2 lines but please make it short",
  description = "Empty state description goes here.",
  primaryButtonLabel = "Button Label",
  secondaryButtonLabel = "Button Label",
  onPrimaryClick,
  onSecondaryClick,
  onClose,
  layout = "default",
  className = "",
}: EmptyStateProps) {
  const isCard = layout === "card";
  const isHorizontal = layout === "horizontal";

  const containerClasses = [
    "w-full transition-all duration-300",

    isCard &&
      "relative bg-white rounded-2xl shadow-lg border border-t-0 border-neutral-100 px-4 py-6 md:p-8 max-w-[392px] tab:max-w-[552px] mx-auto",

    isHorizontal &&
      "flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-[340px] md:max-w-4xl mx-auto",

    !isCard &&
      !isHorizontal &&
      "flex flex-col items-center max-w-[340px] md:max-w-[560px] mx-auto text-center",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {isCard && onClose && (
        <button
          onClick={onClose}
          className="absolute top-7 right-5 md:top-6 md:right-6 text-neutral-400 hover:text-neutral-600 transition-colors p-1 z-10"
          aria-label="Close">
          <CloseIcon className="w-5 h-5" />
        </button>
      )}

      <div
        className={[
          "relative shrink-0 flex justify-center",
          !isHorizontal && "mb-6 md:mb-6",
          isHorizontal && "mb-4 md:mb-0",
          isCard && "mt-4 md:mt-2",
        ]
          .filter(Boolean)
          .join(" ")}>
        <Image
          src="/images/notfound.png"
          alt="Illustration"
          width={400}
          height={300}
          className={[
            "h-auto object-contain",
            isHorizontal
              ? "w-[180px] tab:w-[288px] desktop:w-[408px]"
              : "w-[256px] tab:w-[360px] desktop:w-[480px]",
            isCard && "mt-10",
          ].join(" ")}
          priority
        />
      </div>

      <section
        className={[
          "flex flex-col",
          isHorizontal
            ? "text-center md:text-left items-center md:items-start flex-1"
            : "text-center items-center",
        ].join(" ")}>
        <h3 className="font-bold text-neutral-900 leading-tight text-lg md:text-2xl lg:text-[28px] max-w-[90%]">
          {title}
        </h3>

        <p className="mt-2 text-neutral-500 text-sm md:text-base leading-relaxed max-w-md">
          {description}
        </p>

        {isCard && (
          <div className="flex flex-row items-center justify-end gap-3 mt-8 w-full">
            <div className="w-auto">
              <Button
                variant="tertiary"
                size="md"
                onClick={onSecondaryClick}
                className="justify-center">
                {secondaryButtonLabel}
              </Button>
            </div>
            <div className="w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={onPrimaryClick}
                className="justify-center">
                {primaryButtonLabel}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

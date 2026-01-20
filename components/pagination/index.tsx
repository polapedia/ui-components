import { ComponentProps, useMemo } from "react";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

type Size = "sm" | "md" | "lg";

export interface PaginationProps
  extends Omit<ComponentProps<"nav">, "onChange"> {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  size?: Size;
}

const sizeClasses: Record<
  Size,
  {
    page: string;
    arrow: string;
    dots: string;
  }
> = {
  sm: {
    page: "w-5 h-5 text-[14px] [&_svg]:w-4 [&_svg]:h-4",
    arrow: "w-8 h-8 [&_svg]:w-4 [&_svg]:h-4",
    dots: "w-8 h-8 text-[13px]",
  },
  md: {
    page: "w-10 h-10 text-[15px] [&_svg]:w-5 [&_svg]:h-5",
    arrow: "w-10 h-10 [&_svg]:w-5 [&_svg]:h-5",
    dots: "w-10 h-10 text-[15px]",
  },
  lg: {
    page: "w-12 h-12 text-[17px] [&_svg]:w-6 [&_svg]:h-6",
    arrow: "w-12 h-12 [&_svg]:w-6 [&_svg]:h-6",
    dots: "w-12 h-12 text-[17px]",
  },
};

export default function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  size = "md",
  className,
  ...props
}: PaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  }, [totalPages, page, siblingCount]);

  const handleNext = () => {
    if (page < totalPages) onChange(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) onChange(page - 1);
  };

  const sizeCfg = sizeClasses[size];

  const arrowBase =
    "flex items-center justify-center rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

  const pageBase =
    "rounded-full flex items-center justify-center font-medium transition-all";

  return (
    <nav
      className={`flex items-center gap-2 select-none ${className || ""}`}
      aria-label="Pagination"
      {...props}>
      {/* Prev */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`${arrowBase} ${sizeCfg.arrow} text-[#323232] hover:text-gray-900 hover:bg-gray-100`}>
        <ChevronLeftIcon />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`dots-${index}`}
                className={`${sizeCfg.dots} flex items-center justify-center text-gray-400 font-medium`}>
                ...
              </span>
            );
          }

          const numericPage = pageNumber as number;
          const isCurrent = page === numericPage;

          const variantClasses = isCurrent
            ? "bg-linear-to-b from-gradient-primary to-gradient-secondary text-white shadow-sm hover:bg-primary-600"
            : "text-black hover:bg-background-hover";

          return (
            <button
              key={numericPage}
              onClick={() => onChange(numericPage)}
              aria-current={isCurrent ? "page" : undefined}
              className={`${pageBase} ${sizeCfg.page} ${variantClasses}`}>
              {numericPage}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`${arrowBase} ${sizeCfg.arrow} text-[#323232] hover:text-gray-900 hover:bg-gray-100`}>
        <ChevronRightIcon />
      </button>
    </nav>
  );
}

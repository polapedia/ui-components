import { ChevronRightIcon } from '@/lib';
import type { BreadcrumbProps } from '../types';
import {
  baseClasses,
  textSizeClasses,
  iconSizeClasses,
  defaultTextClass,
  currentTextClass,
} from '../styles/default';

export default function DefaultBreadcrumb(props: BreadcrumbProps) {
  const { items, size = 'md', separator, className } = props;

  return (
    <nav
      aria-label="Breadcrumb"
      className={[baseClasses, className].filter(Boolean).join(' ')}
    >
      <ol className="flex items-center gap-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const textClassName = [
            textSizeClasses[size],
            isLast ? currentTextClass : defaultTextClass,
            'transition-all',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-6"
            >
              {item.href && !isLast ? (
                <a href={item.href} className={textClassName}>
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={textClassName}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={[
                    iconSizeClasses[size],
                    'inline-flex items-center justify-center text-content-primary shrink-0',
                  ].join(' ')}
                >
                  {separator ?? <ChevronRightIcon />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

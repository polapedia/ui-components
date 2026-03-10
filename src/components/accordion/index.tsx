import { useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

export type AccordionItemData = {
  id: number | string;
  question: string;
  answer: string;
};

type Size = 'sm' | 'md';
type IconPosition = 'left' | 'right';

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  defaultOpenId?: AccordionItemData['id'] | null;
  allowMultipleOpen?: boolean;
  size?: Size;
  showLine?: boolean;
  iconPosition?: IconPosition;
}

export default function Accordion({
  items,
  className = '',
  defaultOpenId = null,
  allowMultipleOpen = false,
  size = 'md',
  showLine = false,
  iconPosition = 'right',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<AccordionItemData['id']>>(
    defaultOpenId != null ? new Set([defaultOpenId]) : new Set()
  );

  const toggle = (id: AccordionItemData['id']) => {
    setOpenIds((prev) => {
      if (!allowMultipleOpen) {
        return prev.has(id) ? new Set() : new Set([id]);
      }

      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <AccordionItemRow
            key={item.id}
            item={item}
            isOpen={isOpen}
            onToggle={() => {
              toggle(item.id);
            }}
            size={size}
            showLine={showLine}
            iconPosition={iconPosition}
          />
        );
      })}
    </div>
  );
}

interface ItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  size: Size;
  showLine: boolean;
  iconPosition: IconPosition;
}

function AccordionItemRow({
  item,
  isOpen,
  onToggle,
  size,
  showLine,
  iconPosition,
}: ItemProps) {
  const isMd = size === 'md';
  const lines = (item.answer ?? '').split('\n');

  const parsedList = lines
    .map((line) => line.trim())
    .filter((line) => {
      const dotIndex = line.indexOf('.');
      if (dotIndex === -1) return false;

      const maybeNumber = line.slice(0, dotIndex);
      return !isNaN(Number(maybeNumber));
    })
    .map((line) => {
      const dotIndex = line.indexOf('.');
      return line.slice(dotIndex + 1).trim();
    });

  const isNumberedList = parsedList.length > 1;
  const iconSpacing = iconPosition === 'right' ? 'ml-2' : 'mr-2';

  const basePadding = isMd ? 'p-[24px]' : 'p-[16px]';
  const titleClasses = isMd
    ? 'text-[32px] font-medium text-black'
    : 'text-[14px] font-medium text-black';

  const descriptionClasses = isMd
    ? 'text-[20px] font-normal text-[#212529] -mt-2'
    : 'text-[14px] font-normal text-[#212529] -mt-1.5';

  const renderIcon = () => (
    <div
      className={`transform transition-transform duration-300 ${
        isOpen ? '-rotate-180' : 'rotate-0'
      } shrink-0 ${iconSpacing} ${isMd ? 'px-2' : 'px-1'}`}
    >
      <ChevronDownIcon className={isMd ? 'w-4 h-4' : 'w-2.5 h-2.5'} />
    </div>
  );

  return (
    <div className="bg-background-hover group has-[button:hover]:bg-neutral-700 rounded-2xl overflow-hidden transition-all duration-300">
      <div className={basePadding}>
        <button
          id={`accordion-trigger-${item.id}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${item.id}`}
          className="
          w-full flex items-center justify-between text-left
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
        "
        >
          {iconPosition === 'left' && renderIcon()}
          <span className={`${titleClasses} flex-1`}>{item.question}</span>
          {iconPosition === 'right' && renderIcon()}
        </button>
        {showLine && (
          <div className={isMd ? 'mt-4.25' : 'mt-3.5'}>
            <hr
              className={`border-t border-content-secondary ${isMd ? 'border-2' : 'border'}`}
            />
          </div>
        )}
      </div>

      <div
        id={`accordion-panel-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
        aria-hidden={!isOpen}
        className="overflow-hidden"
      >
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className={`${isMd ? 'px-6 pb-6' : 'px-4 pb-4'}`}>
              <div className={descriptionClasses}>
                {isNumberedList ? (
                  <ol className="list-decimal pl-5 space-y-1">
                    {parsedList.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ol>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

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
    defaultOpenId != null ? new Set([defaultOpenId]) : new Set(),
  );

  const toggle = (id: AccordionItemData['id']) => {
    setOpenIds((prev) => {
      const next = new Set(prev);

      if (allowMultipleOpen) {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      } else {
        // single open mode
        if (next.has(id)) {
          next.clear(); // close
        } else {
          next.clear();
          next.add(id); // open new
        }
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
            onToggle={() => toggle(item.id)}
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
  const isNumberedList = /\d+\./.test(item.answer);
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
      } shrink-0 ${iconSpacing} ${isMd ? 'px-2' : 'px-1'}`}>
      <ChevronDownIcon className={isMd ? 'w-4 h-4' : 'w-2.5 h-2.5'} />
    </div>
  );

  return (
    <div className='bg-background-hover group has-[button:hover]:bg-neutral-700 rounded-2xl overflow-hidden transition-all duration-300'>
      <div className={basePadding}>
        <button
          type='button'
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${item.id}`}
          className='
          w-full flex items-center justify-between text-left
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
        '>
          {iconPosition === 'left' && renderIcon()}
          <span className={`${titleClasses} flex-1`}>{item.question}</span>
          {iconPosition === 'right' && renderIcon()}
        </button>
        {showLine && (
          <div className={isMd ? 'mt-[17px]' : 'mt-3.5'}>
            <hr
              className={`border-t border-content-secondary ${isMd ? 'border-2' : 'border'}`}
            />
          </div>
        )}
      </div>

      <div
        id={`accordion-panel-${item.id}`}
        role='region'
        aria-hidden={!isOpen}
        hidden={!isOpen}
        className='overflow-hidden'>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
          <div className='overflow-hidden'>
            <div className={`${isMd ? 'px-6 pb-6' : 'px-4 pb-4'}`}>
              <div className={descriptionClasses}>
                {isNumberedList ? (
                  <ol className='list-decimal pl-5 space-y-1'>
                    {item.answer
                      .split(/\s*\d+\.\s*/g)
                      .filter(Boolean)
                      .map((line, index) => (
                        <li key={index}>{line.trim()}</li>
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

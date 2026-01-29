"use client";

import { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";

export type AccordionItem = {
  id: number | string;
  question: string;
  answer: string;
};

type Size = "sm" | "md";
type IconPosition = "left" | "right";

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpenId?: AccordionItem["id"] | null;
  allowMultipleOpen?: boolean;
  size?: Size;
  showLine?: boolean;
  iconPosition?: IconPosition;
}

export default function Accordion({
  items,
  className = "",
  defaultOpenId = null,
  allowMultipleOpen = false,
  size = "md",
  showLine = false,
  iconPosition = "right",
}: AccordionProps) {
  const [openId, setOpenId] = useState<AccordionItem["id"] | null>(
    defaultOpenId,
  );
  const [openIds, setOpenIds] = useState<Set<AccordionItem["id"]>>(
    defaultOpenId != null ? new Set([defaultOpenId]) : new Set(),
  );

  const toggle = (id: AccordionItem["id"]) => {
    if (!allowMultipleOpen) {
      setOpenId((prev) => (prev === id ? null : id));
      return;
    }

    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {items.map((item) => {
        const isOpen = allowMultipleOpen
          ? openIds.has(item.id)
          : openId === item.id;

        return (
          <AccordionItem
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
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  size: Size;
  showLine: boolean;
  iconPosition: IconPosition;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  size,
  showLine,
  iconPosition,
}: ItemProps) {
  const isMd = size === "md";
  const isNumberedList = /\d+\./.test(item.answer);

  const basePadding = isMd ? "p-[24px]" : "p-[16px]";
  const titleClasses = isMd
    ? "text-[32px] font-medium text-black"
    : "text-[14px] font-medium text-black";

  const descriptionClasses = isMd
    ? `text-[20px] font-normal text-[#212529] ${showLine ? "-mt-2" : "-mt-2"}`
    : `text-[14px] font-normal text-[#212529] -mt-1.5`;

  const renderIcon = () => (
    <div
      className={`transform transition-transform duration-300 ${
        isOpen ? "-rotate-180" : "rotate-0"
      } shrink-0 ${iconPosition === "right" && isMd ? "ml-2" : "mr-2"} ${isMd ? "px-2" : "px-1"}`}
    >
      <ChevronDownIcon className={isMd ? "w-4 h-4" : "w-2.5 h-2.5"} />
    </div>
  );

  return (
    <div className="bg-background-hover hover:bg-neutral-700 rounded-2xl overflow-hidden transition-all duration-300">
      <div className={basePadding}>
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between text-left focus:outline-none group`}
        >
          {iconPosition === "left" && renderIcon()}
          <span className={`${titleClasses} flex-1`}>{item.question}</span>
          {iconPosition === "right" && renderIcon()}
        </button>
        {showLine && (
          <div className={isMd ? "mt-[17px]" : "mt-3.5"}>
            <hr
              className={`border-t border-content-secondary ${isMd ? "border-2" : "border"}`}
            />
          </div>
        )}
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`${isMd ? "px-6 pb-6" : "px-4 pb-4"}`}>
            <div className={descriptionClasses}>
              {isNumberedList ? (
                <ol className="list-decimal pl-5 space-y-1">
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
  );
}

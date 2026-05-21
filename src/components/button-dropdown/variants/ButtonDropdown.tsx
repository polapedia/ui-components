'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ButtonDropdownProps, DropdownItem } from '../types';
import DropdownContent from './DropdownContent';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

function resolveTriggerLabel({
  label,
  placeholder,
  selectedItem,
  updateLabelOnSelect,
}: {
  label?: string;
  placeholder: string;
  selectedItem?: DropdownItem;
  updateLabelOnSelect: boolean;
}) {
  if (!updateLabelOnSelect) {
    return label ?? placeholder;
  }

  return selectedItem?.label ?? label ?? placeholder;
}

export default function ButtonDropdown({
  label,
  triggerVariant = 'primary',
  menuVariant = 'default',
  size = 'md',
  shape = 'pill',
  disabled = false,
  showDivider = true,
  leftIcon,
  rightIcon,
  children,
  itemSize,
  items = [],
  onItemSelect,
  className,
  defaultValue,
  value,
  placeholder = 'Select Option',
  updateLabelOnSelect = true,
  ...restProps
}: Readonly<ButtonDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;
  const resolvedItemSize = itemSize ?? size;

  const selectedItem = useMemo(
    () => items.find((item) => item.value === selectedValue),
    [items, selectedValue]
  );

  const triggerLabel = resolveTriggerLabel({
    label,
    placeholder,
    selectedItem,
    updateLabelOnSelect,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDropdown() {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }

  function handleSelect(item: DropdownItem) {
    if (item.disabled) return;

    if (value === undefined) {
      setInternalValue(item.value);
    }

    item.onClick?.();
    onItemSelect?.(item);
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex font-semibold transition-all select-none z-10 ${className || ''}`}
      {...restProps}
    >
      <DropdownTrigger
        label={triggerLabel}
        size={size}
        shape={shape}
        triggerVariant={triggerVariant}
        disabled={disabled}
        isOpen={isOpen}
        showDivider={showDivider}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onClick={toggleDropdown}
      />

      <div
        className={`absolute left-0 top-full mt-2 min-w-full origin-top z-50 transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {items.length > 0 ? (
          <DropdownMenu
            items={items}
            selectedValue={selectedValue}
            size={size}
            shape={shape}
            menuVariant={menuVariant}
            itemSize={resolvedItemSize}
            onSelect={handleSelect}
          />
        ) : (
          <DropdownContent menuVariant={menuVariant} shape={shape}>
            {children}
          </DropdownContent>
        )}
      </div>
    </div>
  );
}

ButtonDropdown.displayName = 'ButtonDropdown';

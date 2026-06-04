import { getItemClassName } from '../styles/item';
import { getMenuPanelClassName } from '../styles/menu';
import type {
  DropdownItem,
  DropdownShape,
  DropdownSize,
  ItemSize,
  MenuVariant,
} from '../types';

interface DropdownMenuProps {
  items: DropdownItem[];
  selectedValue?: string;
  size: DropdownSize;
  shape: DropdownShape;
  menuVariant: MenuVariant;
  itemSize: ItemSize;
  onSelect: (_item: DropdownItem) => void;
}

export default function DropdownMenu({
  items,
  selectedValue,
  size,
  shape,
  menuVariant,
  itemSize,
  onSelect,
}: Readonly<DropdownMenuProps>) {
  const isLightMenu = menuVariant === 'light';

  return (
    <div
      className={getMenuPanelClassName({
        size,
        shape,
        menuVariant,
      })}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        const resolvedVariant = item.disabled
          ? 'disabled'
          : isSelected
            ? 'selected'
            : (item.variant ?? 'default');

        return (
          <button
            key={item.value}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            data-light={isLightMenu}
            onClick={() => onSelect(item)}
            className={getItemClassName({
              itemSize,
              itemVariant: resolvedVariant,
              isLightMenu,
              disabled: item.disabled,
            })}
          >
            {item.icon ? (
              <span className="inline-flex shrink-0">{item.icon}</span>
            ) : null}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

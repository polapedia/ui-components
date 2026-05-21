import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { dividerClasses, getTriggerClassName } from '../styles/trigger';
import type { DropdownShape, DropdownSize, TriggerVariant } from '../types';

interface DropdownTriggerProps {
  label: string;
  size: DropdownSize;
  shape: DropdownShape;
  triggerVariant: TriggerVariant;
  disabled: boolean;
  isOpen: boolean;
  showDivider: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: () => void;
}

export default function DropdownTrigger({
  label,
  size,
  shape,
  triggerVariant,
  disabled,
  isOpen,
  showDivider,
  leftIcon,
  rightIcon,
  onClick,
}: Readonly<DropdownTriggerProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={getTriggerClassName({
        size,
        shape,
        triggerVariant,
        disabled,
      })}
    >
      <div className="flex items-center gap-2">
        {leftIcon ? (
          <span className="inline-flex opacity-90">{leftIcon}</span>
        ) : null}
        <span>{label}</span>
      </div>

      {showDivider ? (
        <div
          className={`w-px h-1/2 self-center mx-2 ${dividerClasses[triggerVariant]}`}
        />
      ) : null}

      <div className={showDivider ? 'pl-2' : 'pl-7'}>
        {rightIcon ? (
          <span className="inline-flex opacity-90">{rightIcon}</span>
        ) : (
          <span className="inline-flex items-center justify-center">
            <ChevronDownIcon
              className={`block w-3 h-3 md:w-3.5 md:h-3.5 transition-transform duration-300 ${
                isOpen ? '-rotate-180 mt-1.5' : 'rotate-0 mt-2.5'
              }`}
            />
          </span>
        )}
      </div>
    </button>
  );
}

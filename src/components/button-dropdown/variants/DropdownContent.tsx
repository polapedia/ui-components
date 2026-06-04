import { getContentPanelClassName } from '../styles/menu';
import type { DropdownShape, MenuVariant } from '../types';

interface DropdownContentProps {
  menuVariant: MenuVariant;
  shape: DropdownShape;
  children?: React.ReactNode;
}

export default function DropdownContent({
  menuVariant,
  shape,
  children,
}: Readonly<DropdownContentProps>) {
  return (
    <div
      className={getContentPanelClassName({
        shape,
        menuVariant,
      })}
    >
      {children || (
        <p>This is the example of trigger action that button dropdown has.</p>
      )}
    </div>
  );
}

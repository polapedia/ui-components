import type { SidebarProps } from './types';
import OverlaySidebar from './variants/OverlaySidebar';
import HoverSidebar from './variants/HoverSidebar';
import CollapsibleSidebar from './variants/CollapsibleSidebar';

export type * from './types';

export default function Sidebar(props: SidebarProps) {
  switch (props.variant) {
    case 'overlay':
      return <OverlaySidebar {...props} />;
    case 'hover':
      return <HoverSidebar {...props} />;
    case 'collapsible':
    default:
      return <CollapsibleSidebar {...props} />;
  }
}

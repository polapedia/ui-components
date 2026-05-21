import type { TabsProps } from './types';
import DefaultTabs from './variants/DefaultTabs';

export type * from './types';

export default function Tabs(props: Readonly<TabsProps>) {
  return <DefaultTabs {...props} />;
}

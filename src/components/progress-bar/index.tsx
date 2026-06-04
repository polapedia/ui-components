import type { ProgressBarProps } from './types';
import DefaultProgressBar from './variants/DefaultProgressBar';

export type * from './types';

export default function ProgressBar(props: Readonly<ProgressBarProps>) {
  return <DefaultProgressBar {...props} />;
}

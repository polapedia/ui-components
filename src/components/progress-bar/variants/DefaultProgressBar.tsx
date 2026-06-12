import type { ProgressBarProps } from '../types';
import { getProgressBarClassName } from '../styles/progress-bar';

export default function DefaultProgressBar({
  value,
  max = 100,
  size = 'md',
  fill,
  className,
  ...rest
}: Readonly<ProgressBarProps>) {
  const safeMax = max > 0 ? max : 1;
  const safeValue = Math.min(safeMax, Math.max(0, value));

  return (
    <progress
      value={safeValue}
      max={safeMax}
      className={getProgressBarClassName({ size, className })}
      {...rest}
      style={
        {
          '--progress-fill':
            fill || 'linear-gradient(to bottom, #df4141, #912a2a)',
          '--progress-track': '#ced4da',
        } as React.CSSProperties
      }
    />
  );
}

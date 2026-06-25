import { cn } from '@/utils/cn';
import { simpleStyles } from '../styles/simple';
import type { SimpleCardProps } from '../types';

export default function SimpleCard(props: SimpleCardProps) {
  const {
    title,
    description,
    topIcon,
    className,
    size = 'md',
    ...rest
  } = props;

  const style = simpleStyles[size];

  return (
    <div
      className={cn(`relative flex flex-col ${style.container}`, className)}
      {...rest}
    >
      <div className={style.topBlockMarginTop}>
        {topIcon && <div className={style.topIcon}>{topIcon}</div>}
      </div>

      <div>
        <h3 className={style.title}>{title}</h3>
        {description && <p className={style.description}>{description}</p>}
      </div>
    </div>
  );
}

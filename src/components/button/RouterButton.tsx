import type { ComponentProps, MouseEvent } from 'react';
import Button from '.';

type RouterButtonProps = ComponentProps<typeof Button> & {
  href: string;
};

export function RouterButton({
  href,
  onClick,
  children,
  ...rest
}: RouterButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (!e.defaultPrevented) {
      globalThis.location.href = href;
    }
  };

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
}

import type { ComponentProps } from 'react';
import Button from '.';

export function RouterButton(args: ComponentProps<typeof Button>) {
  return (
    <Button
      {...args}
      onClick={() => {
        window.location.href = '/dashboard';
      }}
    >
      Go to Dashboard
    </Button>
  );
}

import { ComponentProps } from 'react';
import Button from '.';
import { useRouter } from 'next/navigation';

export function RouterButton(args: ComponentProps<typeof Button>) {
  const router = useRouter();

  return (
    <Button
      {...args}
      onClick={() => {
        router.push('/dashboard');
      }}
    >
      Go to Dashboard
    </Button>
  );
}

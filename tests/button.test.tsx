import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../src/components/button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders left icon when provided', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">icon</span>}>
        Button
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">icon</span>}>
        Button
      </Button>
    );

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});

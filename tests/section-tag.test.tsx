import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionTag from '../src/components/section-tag';

describe('SectionTag', () => {
  it('renders children text', () => {
    render(<SectionTag>Top Creator</SectionTag>);
    expect(screen.getByText('Top Creator')).toBeInTheDocument();
  });

  it('applies default size md', () => {
    render(<SectionTag>Default</SectionTag>);
    expect(screen.getByText('Default').className).toContain('h-[48px]');
  });

  it('applies sm size', () => {
    render(<SectionTag size="sm">Small</SectionTag>);
    expect(screen.getByText('Small').className).toContain('h-[40px]');
  });

  it('applies lg size', () => {
    render(<SectionTag size="lg">Large</SectionTag>);
    expect(screen.getByText('Large').className).toContain('h-[58px]');
  });

  it('renders accent variant by default', () => {
    render(<SectionTag>Default</SectionTag>);
    const span = screen.getByText('Default');
    expect(span.className).toContain('border-content-secondary');
    expect(span.className).not.toContain('p-[1.5px]');
  });

  it('renders brand variant with gradient wrapper', () => {
    render(<SectionTag variant="brand">Brand</SectionTag>);
    const textSpan = screen.getByText('Brand');
    const innerSpan = textSpan.parentElement;
    if (!innerSpan) throw new Error('inner span not found');
    const outer = innerSpan.parentElement;
    if (!outer) throw new Error('outer span not found');
    expect(outer.className).toContain('p-[1.5px]');
    expect(outer.className).toContain('from-gradient-primary');
  });

  it('renders gradient text inside brand variant', () => {
    render(<SectionTag variant="brand">Brand</SectionTag>);
    const gradientText = screen.getByText('Brand');
    expect(gradientText.className).toContain('bg-clip-text');
    expect(gradientText.className).toContain('text-transparent');
  });

  it('applies custom className', () => {
    render(<SectionTag className="my-custom">Custom</SectionTag>);
    expect(screen.getByText('Custom').className).toContain('my-custom');
  });

  it('renders complex children', () => {
    render(
      <SectionTag>
        <span data-testid="child-a">A</span>
        <span data-testid="child-b">B</span>
      </SectionTag>
    );
    expect(screen.getByTestId('child-a')).toBeInTheDocument();
    expect(screen.getByTestId('child-b')).toBeInTheDocument();
  });
});

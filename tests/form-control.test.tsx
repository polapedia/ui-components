import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Checkbox from '../src/components/checkbox';
import Radio from '../src/components/radio';
import {
  getHelperTextColor,
  getLabelTextColor,
} from '../src/components/form-control/utils';

describe('Form Control Utilities', () => {
  describe('getHelperTextColor', () => {
    it('returns red for error state', () => {
      expect(getHelperTextColor(true, false)).toBe('text-accents-red');
    });
    it('returns gray-400 for disabled state', () => {
      expect(getHelperTextColor(false, true)).toBe('text-gray-400');
    });
    it('returns gray-500 for default state', () => {
      expect(getHelperTextColor(false, false)).toBe('text-gray-500');
    });
  });

  describe('getLabelTextColor', () => {
    it('returns red for error state', () => {
      expect(getLabelTextColor(true, false)).toBe('text-accents-red');
    });

    describe('checkbox variant', () => {
      it('returns neutral-500 for disabled state', () => {
        expect(getLabelTextColor(false, true, 'checkbox')).toBe(
          'text-neutral-500'
        );
      });
      it('returns black for default state', () => {
        expect(getLabelTextColor(false, false, 'checkbox')).toBe('text-black');
      });
    });

    describe('radio variant', () => {
      it('returns gray-400 for disabled state', () => {
        expect(getLabelTextColor(false, true, 'radio')).toBe('text-gray-400');
      });
      it('returns gray-900 for default state', () => {
        expect(getLabelTextColor(false, false, 'radio')).toBe('text-gray-900');
      });
    });
  });
});

describe('Checkbox Component', () => {
  it('renders label and helper text', () => {
    render(
      <Checkbox label="Accept terms" helperText="Please read carefully" />
    );
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('Please read carefully')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('shows asterisk when required', () => {
    render(<Checkbox label="Required" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

describe('Radio Component', () => {
  it('renders label and helper text', () => {
    render(<Radio label="Option 1" helperText="Pick one" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio label="Disabled Radio" disabled />);
    expect(screen.getByLabelText('Disabled Radio')).toBeDisabled();
  });

  it('shows asterisk when required', () => {
    render(<Radio label="Required Radio" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

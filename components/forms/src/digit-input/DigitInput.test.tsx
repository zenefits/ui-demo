import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import DigitInput from './DigitInput';

describe('DigitInput', () => {
  beforeEach(() => {
    cleanup();
  });

  it('works without using value prop', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput />);
    getByDisplayValue('');
  });

  it('works with empty string value', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput value="" />);
    getByDisplayValue('');
  });

  it('works with digits', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput value="12345" />);
    getByDisplayValue('12345');
  });

  it('works with leading zeros', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput value="00012345" />);
    getByDisplayValue('00012345');
  });

  it('masks non-digit characters', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput value="1a!2b@3c#4d$5e%" />);
    getByDisplayValue('12345');
  });

  it('masks decimal numbers', () => {
    const { getByDisplayValue } = renderWithContext(<DigitInput value="0.5" />);
    getByDisplayValue('05');
  });
});

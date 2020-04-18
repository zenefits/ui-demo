import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import DigitInputDisplay from './DigitInputDisplay';

describe('DigitInput', () => {
  beforeEach(() => {
    cleanup();
  });

  it('works with empty string value', () => {
    const { getByText } = renderWithContext(<DigitInputDisplay value="" />);
    getByText('—');
  });

  it('works with digits', () => {
    const { getByText } = renderWithContext(<DigitInputDisplay value="12345" />);
    getByText('12345');
  });

  it('works with leading zeros', () => {
    const { getByText } = renderWithContext(<DigitInputDisplay value="00012345" />);
    getByText('00012345');
  });

  it('masks non-digit characters', () => {
    const { getByText } = renderWithContext(<DigitInputDisplay value="1a!2b@3c#4d$5e%" />);
    getByText('12345');
  });

  it('masks decimal numbers', () => {
    const { getByText } = renderWithContext(<DigitInputDisplay value="0.5" />);
    getByText('05');
  });
});

import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import NumberInputDisplay from './NumberInputDisplay';

describe('NumberInputDisplay', () => {
  afterEach(cleanup);

  it('should format thousands automatically', () => {
    const { getByText } = renderWithContext(<NumberInputDisplay value="1234" />);
    getByText('1,234');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<NumberInputDisplay value="" />);
    getByText('—');
  });

  it('should handle 0', () => {
    const { getByText } = renderWithContext(<NumberInputDisplay value={0} />);
    getByText('0');
  });

  it('should show allow negative number', () => {
    const { getByText } = renderWithContext(<NumberInputDisplay value="-1234.00" allowNegative />);
    getByText('-1,234.00');
  });
});

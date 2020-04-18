import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import MoneyInputDisplay from './MoneyInputDisplay';

describe('MoneyInputDisplay', () => {
  afterEach(cleanup);

  it('should show prefix `$` automatically', () => {
    const { getByText } = renderWithContext(<MoneyInputDisplay value="1234" />);
    getByText('$1,234');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<MoneyInputDisplay value="" />);
    getByText('—');
  });

  it('should handle 0', () => {
    const { getByText } = renderWithContext(<MoneyInputDisplay value={0} />);
    getByText('$0');
  });

  it('should handle cents', () => {
    const { getByText } = renderWithContext(<MoneyInputDisplay value="1234.00" />);
    getByText('$1,234.00');
  });

  it('should show allow negative number', () => {
    const { getByText } = renderWithContext(<MoneyInputDisplay value="-1234.00" allowNegative />);
    getByText('-$1,234.00');
  });
});

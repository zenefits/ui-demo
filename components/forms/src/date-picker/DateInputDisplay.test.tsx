import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import DateInputDisplay from './DateInputDisplay';

describe('DateInputDisplay', () => {
  afterEach(cleanup);

  it('should format thousands automatically', () => {
    const { getByText } = renderWithContext(<DateInputDisplay value="2019-01-22" />);
    getByText('01/22/2019');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<DateInputDisplay value="" />);
    getByText('—');
  });

  it('should handle null', () => {
    const { getByText } = renderWithContext(<DateInputDisplay value={null} />);
    getByText('—');
  });
});

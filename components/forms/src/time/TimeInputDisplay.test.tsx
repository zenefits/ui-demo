import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import TimeInputDisplay from './TimeInputDisplay';

describe('TimeInputDisplay', () => {
  afterEach(cleanup);

  it('handles time string', () => {
    const { getByText } = renderWithContext(<TimeInputDisplay value="12:00 AM" />);
    getByText('12:00 AM');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<TimeInputDisplay value="" />);
    getByText('—');
  });

  it('should handle null', () => {
    const { getByText } = renderWithContext(<TimeInputDisplay value={null} />);
    getByText('—');
  });
});

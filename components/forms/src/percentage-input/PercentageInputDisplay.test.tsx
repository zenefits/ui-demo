import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import PercentageInputDisplay from './PercentageInputDisplay';

describe('PercentageInputDisplay', () => {
  afterEach(cleanup);

  it('handles percentage', () => {
    const { getByText } = renderWithContext(<PercentageInputDisplay value={12.34} />);
    getByText('12.34%');
  });

  it('handles 0', () => {
    const { getByText } = renderWithContext(<PercentageInputDisplay value={0} />);
    getByText('0%');
  });

  it('handles percentage as string', () => {
    const { getByText } = renderWithContext(<PercentageInputDisplay value="12.34" />);
    getByText('12.34%');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<PercentageInputDisplay value="" />);
    getByText('—');
  });

  it('should handle null', () => {
    const { getByText } = renderWithContext(<PercentageInputDisplay value={null} />);
    getByText('—');
  });
});

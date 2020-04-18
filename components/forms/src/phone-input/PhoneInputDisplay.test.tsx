import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import PhoneInputDisplay from './PhoneInputDisplay';

describe('PhoneInputDisplay', () => {
  afterEach(cleanup);

  it('should format correctly', () => {
    const { getByText } = renderWithContext(<PhoneInputDisplay value="5556665555" />);
    getByText('(555) 666-5555');
  });

  it('should handle internatinoal', () => {
    const { getByText } = renderWithContext(<PhoneInputDisplay value="55 123456789" allowInternational />);
    getByText('+55123456789');
  });

  it('handles already formatted', () => {
    const { getByText } = renderWithContext(<PhoneInputDisplay value="(555) 666-5555" />);
    getByText('(555) 666-5555');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<PhoneInputDisplay value="" />);
    getByText('—');
  });

  it('should handle null', () => {
    const { getByText } = renderWithContext(<PhoneInputDisplay value={null} />);
    getByText('—');
  });
});

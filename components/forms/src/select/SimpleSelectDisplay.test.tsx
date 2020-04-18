import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import SimpleSelectDisplay from './SimpleSelectDisplay';

describe('SimpleSelectDisplay', () => {
  afterEach(cleanup);

  it('should handle string value', () => {
    const { getByText } = renderWithContext(<SimpleSelectDisplay value="1234" />);
    getByText('1234');
  });

  it('should handle empty', () => {
    const { getByText } = renderWithContext(<SimpleSelectDisplay value="" />);
    getByText('—');
  });

  it('handles object value', () => {
    const { getByText } = renderWithContext(
      <SimpleSelectDisplay value={{ id: 0, label: 'Foo' }} getOptionText={(o: any) => o.label} />,
    );
    getByText('Foo');
  });

  it('handles empty object value', () => {
    const { getByText } = renderWithContext(<SimpleSelectDisplay value={null} getOptionText={(o: any) => o.label} />);
    getByText('—');
  });

  it('handles 0 value', () => {
    const optionValueToTextMap: { [key: number]: string } = { 0: 'A label' };
    const { getByText } = renderWithContext(
      <SimpleSelectDisplay value={0 as any} getOptionText={(o: any) => optionValueToTextMap[o]} />,
    );
    getByText('A label');
  });
});

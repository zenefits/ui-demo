import React from 'react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import MoneyInput from './MoneyInput';

describe('MoneyInput', () => {
  it('should show prefix `$` by default', () => {
    const { container } = renderWithContext(<MoneyInput value="1234" />);
    expect(container.querySelector('span').hasAttribute('left'));
    expect(container.querySelector('span').textContent).toEqual('$');
    expect(container.querySelector('input').value).toBe('1,234');
  });

  it('should handle cents', () => {
    const { container } = renderWithContext(<MoneyInput value="1234.00" />);
    expect(container.querySelector('input').value).toBe('1,234.00');
  });

  it('should show allow negative number', () => {
    const { container } = renderWithContext(<MoneyInput allowNegative value="-1234" />);
    expect(container.querySelector('input').value).toBe('-1,234');
  });
});

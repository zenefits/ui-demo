import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import MoneyInput from './MoneyInput';

describe('MoneyInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<MoneyInput />)).toHaveLength(1);
  });

  it('should show prefix `$` automatically', () => {
    const wrapper = mountWithTheme(<MoneyInput defaultValue="1234" />);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('$1,234');
  });

  it('should show allow negative number', () => {
    const wrapper = mountWithTheme(<MoneyInput allowNegative defaultValue="-1234" />);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('-$1,234');
  });
});

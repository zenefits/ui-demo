import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import PercentageInput from './PercentageInput';

describe('PercentageInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<PercentageInput />)).toHaveLength(1);
  });

  it('should show suffix `%` automatically', () => {
    const wrapper = mountWithTheme(<PercentageInput defaultValue="12" />);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('12%');
  });

  it('should show allow negative number', () => {
    const wrapper = mountWithTheme(<PercentageInput allowNegative defaultValue="-12" />);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('-12%');
  });
});

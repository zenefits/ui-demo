import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'z-frontend-theme';
import PercentageInput from './PercentageInput';

describe('PercentageInput', () => {
  it('should mount without throwing an error', () => {
    expect(
      mount(
        <ThemeProvider>
          <PercentageInput />
        </ThemeProvider>,
      ).find('PercentageInput'),
    ).toHaveLength(1);
  });

  it('should show suffix `%` automatically', () => {
    const wrapper = mount(
      <ThemeProvider>
        <PercentageInput value="12" />
      </ThemeProvider>,
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('12%');
  });

  it('should show allow negative number', () => {
    const wrapper = mount(
      <ThemeProvider>
        <PercentageInput allowNegative value="-12" />
      </ThemeProvider>,
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('-12%');
  });
});

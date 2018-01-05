import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'z-frontend-theme';
import MoneyInput from './MoneyInput';

describe('MoneyInput', () => {
  it('should mount without throwing an error', () => {
    expect(
      mount(
        <ThemeProvider>
          <MoneyInput />
        </ThemeProvider>,
      ).find('MoneyInput'),
    ).toHaveLength(1);
  });

  it('should show prefix `$` automatically', () => {
    const wrapper = mount(
      <ThemeProvider>
        <MoneyInput value="1234" />
      </ThemeProvider>,
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('$1,234');
  });

  it('should show allow negative number', () => {
    const wrapper = mount(
      <ThemeProvider>
        <MoneyInput allowNegative value="-1234" />
      </ThemeProvider>,
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('-$1,234');
  });
});

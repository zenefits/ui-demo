import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ThemeProvider from 'z-frontend-theme/src/ThemeProvider';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should mount without throwing an error', () => {
    expect(
      mount(
        <ThemeProvider>
          <Checkbox />
        </ThemeProvider>,
      ).find('Checkbox'),
    ).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onCheckboxChange = jest.fn();
    const wrapper = mount(
      <ThemeProvider>
        <Checkbox onChange={onCheckboxChange} />
      </ThemeProvider>,
    );
    wrapper.find('Checkbox').simulate('change', { target: { checked: true } });
    expect(onCheckboxChange).toBeCalled();
    expect(onCheckboxChange.mock.calls[0][0]).toBeTruthy();
  });

  it('should not invoke callback when disabled', () => {
    const onCheckboxChange = jest.fn();
    const wrapper = mount(
      <ThemeProvider>
        <Checkbox isDisabled onChange={onCheckboxChange} />
      </ThemeProvider>,
    );
    wrapper.find('Checkbox').simulate('change');
    expect(onCheckboxChange).not.toBeCalled();
  });
});

import React from 'react';

import { mountWithTheme, shallowWithTheme } from 'z-frontend-theme/test-utils/theme';

import Select from './Select';

const combobox = 'input[role="combobox"]';

describe('Select', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Select />).find(combobox)).toHaveLength(1);
  });

  // NOTE: would prefer to use toHaveStyleRule here, but cannot get it working for Select
  it('should mount with size specified', () => {
    const wrapper = mountWithTheme(<Select s="large" />);
    expect(getProps(wrapper)).toHaveProperty('s', 'large');
  });

  it('should default to size medium', () => {
    const wrapper = shallowWithTheme(<Select />);
    expect(getProps(wrapper)).toHaveProperty('s', 'medium');
  });

  it('should support standard select attributes', () => {
    const wrapper = shallowWithTheme(<Select autoComplete="off" placeholder="Placeholder" />);
    const props = getProps(wrapper);
    expect(props).toHaveProperty('autoComplete', 'off');
    expect(props).toHaveProperty('placeholder', 'Placeholder');
  });

  it('should invoke callback on change', () => {
    const onChange = jest.fn();
    // NOTE: does not work reliably with mount(), but shallow is fine
    // https://github.com/airbnb/enzyme/issues/400
    const wrapper = shallowWithTheme(<Select onChange={onChange} />);
    wrapper.find('Select').simulate('change');
    expect(onChange).toBeCalled();
  });
});

function getProps(wrapper) {
  return wrapper.first().props();
}

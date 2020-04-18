import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Input from './Input';

describe('Input', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<Input />)).toHaveLength(1);
  });

  it('should ultimately render an <input> element', () => {
    const rendered = renderEnzymeWithTheme(<Input />);
    expect(rendered.is('input')).toBe(true);
  });

  it('should default to size medium', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.first().props()).toHaveProperty('s', 'medium');
  });

  it('should vary font-size according to `s` prop', () => {
    const small = mountEnzymeWithTheme(<Input s="small" />);
    const large = mountEnzymeWithTheme(<Input s="large" />);
    const smallFontSize = /^1[0-4]px/;
    const largeFontSize = /^1[5-9]px/;
    expect(small).toHaveStyleRule('font-size', smallFontSize);
    expect(large).toHaveStyleRule('font-size', largeFontSize);
  });

  it('should support standard input attributes', () => {
    const rendered = renderEnzymeWithTheme(<Input autoComplete="off" placeholder="Placeholder" />);
    expect(rendered.attr('autocomplete')).toBe('off');
    expect(rendered.attr('placeholder')).toBe('Placeholder');
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<Input mt={123} />);
    expect(mounted).toHaveStyleRule('margin-top', '123px');
  });

  it('should invoke callback on change', () => {
    const onInputChange = jest.fn();
    const wrapper = mountEnzymeWithTheme(<Input onChange={onInputChange} />);
    wrapper.simulate('change');
    expect(onInputChange).toBeCalled();
    expect(onInputChange.mock.calls[0][0]).toBeTruthy();
  });
});

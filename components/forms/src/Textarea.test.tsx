import React from 'react';
import 'jest-styled-components';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from 'z-frontend-theme/test-utils/theme';
import Textarea from './Textarea';

// fail test on console errors (this file only)
console.error = (...args) => {
  throw new Error(...args);
};

describe('Textarea', () => {
  it('should mount fully without throwing an error', () => {
    expect(mountWithTheme(<Textarea defaultValue="Valuable" />).exists()).toBe(true);
  });

  it('should ultimately render a <textarea> element', () => {
    const rendered = renderWithTheme(<Textarea />);
    expect(rendered.is('textarea')).toBe(true);
  });

  it('should render a provided value', () => {
    const rendered = renderWithTheme(<Textarea defaultValue="valuable" />);
    expect(rendered.text()).toBe('valuable');
  });

  it('should render standard <textarea> attributes', () => {
    const rendered = renderWithTheme(<Textarea autoComplete="off" autoFocus placeholder="Placeholder" rows={5} />);
    expect(rendered.attr('autocomplete')).toBe('off');
    expect(rendered.attr('autofocus')).toBe('autofocus');
    expect(rendered.attr('placeholder')).toBe('Placeholder');
    expect(rendered.attr('rows')).toBe('5');
  });

  it('should respect rebass props', () => {
    const mounted = mountWithTheme(<Textarea mt={123} />);
    expect(mounted).toHaveStyleRule('margin-top', '123px');
  });

  it('should respect `resize` prop', () => {
    const withResize = mountWithTheme(<Textarea resize="none" />);
    const withoutResize = mountWithTheme(<Textarea />);
    expect(withResize).toHaveStyleRule('resize', 'none');
    const anyValue = /.*/;
    expect(withoutResize).not.toHaveStyleRule('resize', anyValue);
  });

  it('should default to size medium', () => {
    const wrapper = shallowWithTheme(<Textarea />);
    expect(wrapper.first().props()).toHaveProperty('s', 'medium');
  });

  it('should vary font-size according to `s` prop', () => {
    const small = mountWithTheme(<Textarea s="small" />);
    const large = mountWithTheme(<Textarea s="large" />);
    const smallFontSize = /^1[0-4]px/;
    const largeFontSize = /^1[5-9]px/;
    expect(small).toHaveStyleRule('font-size', smallFontSize);
    expect(large).toHaveStyleRule('font-size', largeFontSize);
  });

  describe('supports event handler', () => {
    it('onChange', () => {
      const handleChange = jest.fn();
      const wrapper = mountWithTheme(<Textarea onChange={handleChange} />);
      wrapper.find('textarea').simulate('change');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('onFocus', () => {
      const handleFocus = jest.fn();
      const wrapper = mountWithTheme(<Textarea onFocus={handleFocus} />);
      wrapper.find('textarea').simulate('focus');
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});

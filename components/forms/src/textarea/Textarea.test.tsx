import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Textarea from './Textarea';

// fail test on console errors (this file only)
console.error = (...args: any[]) => {
  throw new Error(...args);
};

describe('Textarea', () => {
  it('should mount fully without throwing an error', () => {
    expect(mountEnzymeWithTheme(<Textarea defaultValue="Valuable" />).exists()).toBe(true);
  });

  it('should ultimately render a <textarea> element', () => {
    const rendered = renderEnzymeWithTheme(<Textarea />);
    expect(rendered.is('textarea')).toBe(true);
  });

  it('should render a provided value', () => {
    const rendered = renderEnzymeWithTheme(<Textarea defaultValue="valuable" />);
    expect(rendered.text()).toBe('valuable');
  });

  it('should render standard <textarea> attributes', () => {
    const rendered = renderEnzymeWithTheme(
      <Textarea autoComplete="off" autoFocus placeholder="Placeholder" rows={5} />,
    );
    expect(rendered.attr('autocomplete')).toBe('off');
    expect(rendered.attr('autofocus')).toBe('autofocus');
    expect(rendered.attr('placeholder')).toBe('Placeholder');
    expect(rendered.attr('rows')).toBe('5');
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<Textarea mt={123} />);
    expect(mounted).toHaveStyleRule('margin-top', '123px');
  });

  it('should respect `resize` prop', () => {
    const withExplicitResize = mountEnzymeWithTheme(<Textarea resize="none" />);
    const withoutExplicitResize = mountEnzymeWithTheme(<Textarea />);
    expect(withExplicitResize).toHaveStyleRule('resize', 'none');
    expect(withoutExplicitResize).toHaveStyleRule('resize', 'vertical');
  });

  it('should default to size medium', () => {
    const wrapper = shallow(<Textarea />);
    expect(wrapper.first().props()).toHaveProperty('s', 'medium');
  });

  it('should vary font-size according to `s` prop', () => {
    const small = mountEnzymeWithTheme(<Textarea s="small" />);
    const large = mountEnzymeWithTheme(<Textarea s="large" />);
    const smallFontSize = /^1[0-4]px/;
    const largeFontSize = /^1[5-9]px/;
    expect(small).toHaveStyleRule('font-size', smallFontSize);
    expect(large).toHaveStyleRule('font-size', largeFontSize);
  });

  it('should grow in height if autogrow is set to true', () => {
    const wrapper = mountEnzymeWithTheme(<Textarea autoGrow />);
    expect(wrapper.state().autoGrowHeight).toEqual(null);
    wrapper.simulate('input', {
      target: {
        scrollHeight: 300,
      },
    });
    expect(wrapper.state().autoGrowHeight).toEqual(304);
  });

  describe('supports event handler', () => {
    it('onChange', () => {
      const handleChange = jest.fn();
      const wrapper = mountEnzymeWithTheme(<Textarea onChange={handleChange} />);
      wrapper.find('textarea').simulate('change');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('onFocus', () => {
      const handleFocus = jest.fn();
      const wrapper = mountEnzymeWithTheme(<Textarea onFocus={handleFocus} />);
      wrapper.find('textarea').simulate('focus');
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});

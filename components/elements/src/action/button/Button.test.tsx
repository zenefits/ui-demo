import React from 'react';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

import { LoadingSpinner } from '../../../index';
import Button from './Button';

describe('Button', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Button>Hi</Button>).text()).toEqual('Hi');
  });

  it('should mount Button.RouteLink without throwing an error', () => {
    expect(
      mountWithTheme(
        <BrowserRouter>
          <Button.RouteLink to="/reviews/foo" mode="normal" mr={3}>
            Go route
          </Button.RouteLink>
        </BrowserRouter>,
      ).text(),
    ).toEqual('Go route');
  });

  it('should ultimately render a <button> element', () => {
    const rendered = renderWithTheme(<Button>Hi</Button>);
    expect(rendered.is('button')).toBe(true);
  });

  it('should default to size medium', () => {
    const wrapper = shallow(<Button>Hi</Button>);
    expect(wrapper.first().props()).toHaveProperty('s', 'medium');
  });

  it('should vary font-size according to `s` prop', () => {
    const small = mountWithTheme(<Button s="small">Hi</Button>);
    const large = mountWithTheme(<Button s="large">Hi</Button>);
    const smallFontSize = /^1[0-4]px/;
    const largeFontSize = /^1[5-9]px/;
    expect(small).toHaveStyleRule('font-size', smallFontSize);
    expect(large).toHaveStyleRule('font-size', largeFontSize);
  });

  describe('when inProgress', () => {
    it('should include spinner icon', () => {
      const wrapper = mountWithTheme(<Button inProgress>Hi</Button>);
      const spinner = wrapper.find(LoadingSpinner);
      expect(spinner).toHaveLength(1);
    });

    it('should be disabled', () => {
      expect(renderWithTheme(<Button inProgress>Hi</Button>).attr('disabled')).toBeTruthy();
    });

    it('should hide text', () => {
      const wrapper = mountWithTheme(<Button inProgress>Hi</Button>);
      const children = wrapper.find('button').children();
      expect(children).toHaveStyleRule('visibility', 'hidden');
    });
  });

  it('should support standard button attributes', () => {
    const rendered = renderWithTheme(
      <Button id="foo" type="submit" hidden disabled>
        Hi
      </Button>,
    );
    expect(rendered.attr('id')).toBe('foo');
    expect(rendered.attr('type')).toBe('submit');
    expect(rendered.attr('hidden')).toBeTruthy();
    expect(rendered.attr('disabled')).toBeTruthy();
  });

  it('should invoke callback on change', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountWithTheme(<Button onClick={onButtonClick}>Hi</Button>);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toBeCalled();
  });

  it('should not trigger onClick when disabled', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountWithTheme(
      <Button onClick={onButtonClick} disabled>
        Hi
      </Button>,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
  });
});

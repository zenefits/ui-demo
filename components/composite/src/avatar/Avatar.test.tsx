import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

import { getColor } from 'z-frontend-theme';

import Avatar from './Avatar';
import CircularBadge from './CircularBadge';

describe('Avatar', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<Avatar firstName="Ronald" lastName="McDonald" />);
    expect(wrapper).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountWithTheme(
      <Avatar mt={123} bg="primary.a" color="text.light" w={50} height={50} fontStyle="headings.xxl" />,
    );

    expect(mounted).toHaveStyleRule('margin-top', '123px');
    expect(mounted).toHaveStyleRule('background-color', getColor('primary.a'));
    expect(mounted).toHaveStyleRule('color', getColor('text.light'));
    expect(mounted).toHaveStyleRule('width', '50px');
    expect(mounted).toHaveStyleRule('height', '50px');
    expect(mounted).toHaveStyleRule('font-size', '48px');
  });

  it('should default to size medium', () => {
    const mounted = mountWithTheme(<Avatar />);
    expect(mounted.props()).toHaveProperty('s', 'medium');
  });

  describe('when `photoUrl` is provided', () => {
    const photoSource =
      'https://i.pinimg.com/736x/95/2a/04/952a04ea85a8d1b0134516c52198745e--rottweilers-labradors.jpg';

    it('renders an <img>', () => {
      const rendered = renderWithTheme(
        <Avatar firstName="Papa" lastName="John" photoUrl={photoSource} tooltipBody="" />,
      );
      expect(rendered.is('img')).toBe(true);
      expect(rendered.attr('src')).toBe(photoSource);
    });

    it('rendered <img> includes alt text', () => {
      const rendered = renderWithTheme(
        <Avatar firstName="Papa" lastName="John" photoUrl={photoSource} tooltipBody="" />,
      );
      expect(rendered.attr('alt')).toBe("Papa John's picture");
    });
  });

  describe('when `photoUrl` is not provided', () => {
    it('renders initials', () => {
      const rendered = renderWithTheme(<Avatar firstName="Papa" lastName="John" tooltipBody="" />);
      expect(rendered.text()).toBe('PJ');
    });
  });

  describe('when `badge` is provided', () => {
    it('renders badge', () => {
      const mounted = mountWithTheme(<Avatar firstName="Papa" lastName="John" badge="contingent" />);
      const badge = mounted.find(CircularBadge);
      expect(badge.text().trim()).toBe('C');
    });
    it('have the right style ', () => {
      const mounted = mountWithTheme(<Avatar firstName="Papa" lastName="John" badge="contingent" />);
      const badge = mounted.find(CircularBadge);
      expect(badge).toHaveStyleRule('background-color', getColor('tertiary.a'));
      expect(badge).toHaveStyleRule('color', getColor('grayscale.white'));
      expect(badge).toHaveStyleRule('width', '10px');
      expect(badge).toHaveStyleRule('height', '10px');
    });
  });
});

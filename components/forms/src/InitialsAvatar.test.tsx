import React from 'react';
import 'jest-styled-components';
import InitialsAvatar from './InitialsAvatar';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

describe('InitialsAvatar', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<InitialsAvatar firstName={'Ronald'} lastName={'McDonald'} />);
    expect(wrapper.find('InitialsAvatar')).toHaveLength(1);
  });

  it('should respect rebass props', () => {
    const mounted = mountWithTheme(<InitialsAvatar mt={123} />);
    expect(mounted).toHaveStyleRule('margin-top', '123px');
  });

  it('should default to size medium', () => {
    const mounted = mountWithTheme(<InitialsAvatar />);
    expect(mounted.props()).toHaveProperty('s', 'medium');
  });

  describe('when `photoUrl` is provided', () => {
    const photoSource =
      'https://i.pinimg.com/736x/95/2a/04/952a04ea85a8d1b0134516c52198745e--rottweilers-labradors.jpg';

    it('renders an <img>', () => {
      const rendered = renderWithTheme(<InitialsAvatar firstName={'Papa'} lastName={'John'} photoUrl={photoSource} />);
      expect(rendered.is('img')).toBe(true);
      expect(rendered.attr('src')).toBe(photoSource);
    });

    it('rendered <img> includes alt text', () => {
      const rendered = renderWithTheme(<InitialsAvatar firstName={'Papa'} lastName={'John'} photoUrl={photoSource} />);
      expect(rendered.attr('alt')).toBe("Papa John's picture");
    });
  });

  describe('when `photoUrl` is not provided', () => {
    it('renders initials', () => {
      const rendered = renderWithTheme(<InitialsAvatar firstName={'Papa'} lastName={'John'} />);
      expect(rendered.text()).toBe('PJ');
    });

    it('renders an expanded title', () => {
      const rendered = renderWithTheme(<InitialsAvatar firstName={'Papa'} lastName={'John'} />);
      expect(rendered.find('[title="Papa John"]')).toHaveLength(1);
    });
  });
});

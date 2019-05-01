import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountWithThemeIntl, renderWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { Badge } from '../index';

const messages = {
  foo: 'bar',
};

describe('Badge', () => {
  it('should render a `<span>`', () => {
    const rendered = renderWithThemeIntl(<Badge>foo</Badge>);
    expect(rendered.is('span')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountWithThemeIntl(
      <Badge p={123} bg="grayscale.black">
        foo
      </Badge>,
    );
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('background-color', '#000');
  });

  it('should respect i18n props', () => {
    const mounted = mountWithThemeIntl(<Badge textKey="foo" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
  });

  it('should not render util props as attributes', () => {
    const rendered = renderWithTheme(
      <Badge p={123} bg="grayscale.black">
        foo
      </Badge>,
    );
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});

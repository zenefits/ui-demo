import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountEnzymeWithThemeIntl, renderEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { Badge } from '../index';

describe('Badge', () => {
  it('should render a `<span>`', () => {
    const rendered = renderEnzymeWithThemeIntl(<Badge>123</Badge>);
    expect(rendered.is('span')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <Badge p={123} bg="grayscale.black">
        123
      </Badge>,
    );
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('background-color', '#000');
  });

  it('should not render util props as attributes', () => {
    const rendered = renderEnzymeWithTheme(
      <Badge p={123} bg="grayscale.black">
        123
      </Badge>,
    );
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});

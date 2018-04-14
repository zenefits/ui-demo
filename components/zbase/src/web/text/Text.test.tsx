import React from 'react';
import 'jest-styled-components';

import { renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountWithThemeIntl, renderWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { Text } from '../index';

const messages = {
  foo: 'bar',
};

describe('Text', () => {
  it('should render a `<span>`', () => {
    const rendered = renderWithThemeIntl(<Text>foo</Text>);
    expect(rendered.is('span')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountWithThemeIntl(<Text p={123}>foo</Text>);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect i18n props', () => {
    const mounted = mountWithThemeIntl(<Text textKey="foo" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
  });

  it('should respect fontStyle prop', () => {
    const mounted = mountWithThemeIntl(<Text fontStyle="paragraphs.l">foo</Text>);
    /*
      'paragraphs.l': {
        fontFamily: 0,
        fontSize: 2,
        lineHeight: '1.5',
        fontWeight: 0,
      },
    */
    expect(mounted).toHaveStyleRule('font-family', 'Circular,sans-serif');
    expect(mounted).toHaveStyleRule('font-size', '16px');
    expect(mounted).toHaveStyleRule('line-height', '1.5');
    expect(mounted).toHaveStyleRule('font-weight', '400');
  });

  it('should respect both i18n and fontStyle props', () => {
    const mounted = mountWithThemeIntl(<Text textKey="foo" fontStyle="paragraphs.l" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
    expect(mounted).toHaveStyleRule('font-family', 'Circular,sans-serif');
  });

  it('should respect responsive util props', () => {
    /*
      'controls.s': {
        fontFamily: 0,
        fontSize: 0,
        lineHeight: '1',
        fontWeight: 1,
      },
      'controls.xxl': {
        fontFamily: 0,
        fontSize: 4,
        lineHeight: '1.17',
        fontWeight: 1,
      },
    */
    const mounted = mountWithThemeIntl(<Text fontStyle={['controls.s', 'controls.xxl']}>foo</Text>);
    expect(mounted).toHaveStyleRule('font-size', '12px');
    expect(mounted).toHaveStyleRule('line-height', '1');

    expect(mounted).toHaveStyleRule('font-size', '24px', {
      media: 'screen and (min-width:32em)',
    });
    expect(mounted).toHaveStyleRule('line-height', '1.17', {
      media: 'screen and (min-width:32em)',
    });
  });

  it('should not render font-style util prop as attributes', () => {
    const rendered = renderWithTheme(<Text fontStyle="headings.m">foo</Text>);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});

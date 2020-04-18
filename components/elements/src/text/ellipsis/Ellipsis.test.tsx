import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { getColor } from 'z-frontend-theme';
import { TextBlock } from 'zbase';

import Ellipsis, { OverlaidTooltip } from './Ellipsis';

const messages = {
  foo: 'bar',
};

describe('Ellipsis', () => {
  it('should render a `<div>` by default', () => {
    const rendered = renderEnzymeWithTheme(<Ellipsis>foo</Ellipsis>);
    expect(rendered.is('div')).toBe(true);
  });

  it('should be keyboard focusable', () => {
    const rendered = renderEnzymeWithTheme(<Ellipsis fontStyle="headings.m">foo</Ellipsis>);
    expect(rendered.attr('tabindex')).toBe('0');
  });

  // can't really test this: jsdom doesn't handle layout, so offsetWidth etc are always 0
  // it('should have tooltip if too narrow for content');
  // it('should not have tooltip if wide enough for content');

  it('tooltip will show based on state', () => {
    const mounted = mountEnzymeWithTheme(<Ellipsis>something really long</Ellipsis>);
    mounted.setState({ showTooltip: true });
    const tooltip = mounted.find(OverlaidTooltip);
    expect(tooltip.exists()).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(<Ellipsis p={123}>foo</Ellipsis>);
    expect(mounted.find(TextBlock)).toHaveStyleRule('padding', '123px');
  });

  it('should respect text props', () => {
    const mounted = mountEnzymeWithThemeIntl(<Ellipsis textTransform="uppercase">foo</Ellipsis>);
    expect(mounted.find(TextBlock)).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('should respect i18n props', () => {
    const mounted = mountEnzymeWithThemeIntl(<Ellipsis textKey="foo" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
  });

  it('should respect fontStyle prop', () => {
    const mounted = mountEnzymeWithThemeIntl(<Ellipsis fontStyle="paragraphs.l">foo</Ellipsis>);
    /*
      'paragraphs.l': {
        fontSize: 2,
        lineHeight: '1.5',
        fontWeight: 0,
      },
    */
    const textBlock = mounted.find(TextBlock);
    expect(textBlock).toHaveStyleRule('font-size', '16px');
    expect(textBlock).toHaveStyleRule('line-height', '1.5');
    expect(textBlock).toHaveStyleRule('font-weight', '400');
  });

  it('color prop should override fontStyle', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <Ellipsis fontStyle="paragraphs.l" color="primary.a">
        foo
      </Ellipsis>,
    );
    const textBlock = mounted.find(TextBlock);
    expect(textBlock).toHaveStyleRule('font-size', '16px');
    expect(textBlock).toHaveStyleRule('color', `${getColor('primary.a')}`);
  });
});

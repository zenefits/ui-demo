import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountEnzymeWithThemeIntl, renderEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { getColor, theme } from 'z-frontend-theme';

import { TextBlock } from '../index';

const messages = {
  foo: 'bar',
};

describe('TextBlock', () => {
  it('should render a `<div>` by default', () => {
    const rendered = renderEnzymeWithThemeIntl(<TextBlock>foo</TextBlock>);
    expect(rendered.is('div')).toBe(true);
  });

  it('should render what you specify in `tag`', () => {
    const rendered = renderEnzymeWithThemeIntl(<TextBlock tag="p">foo</TextBlock>);
    expect(rendered.is('p')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextBlock p={123}>foo</TextBlock>);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect ellipsis prop', () => {
    const withEllipsis = mountEnzymeWithThemeIntl(<TextBlock ellipsis>foo</TextBlock>);
    expect(withEllipsis).toHaveStyleRule('text-overflow', 'ellipsis');
    const withoutEllipsis = mountEnzymeWithThemeIntl(<TextBlock>foo</TextBlock>);
    expect(withoutEllipsis).not.toHaveStyleRule('text-overflow', 'ellipsis');
  });

  it('should respect text props', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <TextBlock textTransform="uppercase" textAlign="center">
        foo
      </TextBlock>,
    );
    expect(mounted).toHaveStyleRule('text-transform', 'uppercase');
    expect(mounted).toHaveStyleRule('text-align', 'center');
  });

  it('should respect i18n props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextBlock textKey="foo" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
  });

  it('should respect fontStyle prop', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextBlock fontStyle="paragraphs.l">foo</TextBlock>);
    /*
      'paragraphs.l': {
        fontSize: 2,
        lineHeight: '1.5',
        fontWeight: 0,
      },
    */
    expect(mounted).toHaveStyleRule('font-size', '16px');
    expect(mounted).toHaveStyleRule('line-height', '1.5');
    expect(mounted).toHaveStyleRule('font-weight', '400');
  });

  it('should respect both i18n and fontStyle props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextBlock textKey="foo" fontStyle="paragraphs.l" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
    expect(mounted).toHaveStyleRule('font-size', '16px');
  });

  it('color prop should override fontStyle', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <TextBlock fontStyle="paragraphs.l" color="primary.a">
        foo
      </TextBlock>,
    );
    expect(mounted).toHaveStyleRule('font-size', '16px');
    expect(mounted).toHaveStyleRule('color', `${getColor('primary.a')}`);
  });

  it('bold prop should override fontStyle', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <TextBlock bold fontStyle="paragraphs.l">
        foo
      </TextBlock>,
    );
    expect(mounted).toHaveStyleRule('font-weight', String(theme.weights[1]));
  });

  it('should respect responsive util props', () => {
    /*
      'controls.s': {
        fontSize: 0,
        lineHeight: '1',
        fontWeight: 1,
      },
      'controls.xxl': {
        fontSize: 4,
        lineHeight: '1.17',
        fontWeight: 1,
      },
    */
    const mounted = mountEnzymeWithThemeIntl(<TextBlock fontStyle={['controls.s', 'controls.xxl']}>foo</TextBlock>);
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
    const rendered = renderEnzymeWithTheme(<TextBlock fontStyle="headings.m">foo</TextBlock>);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });

  it('should pass ref down', () => {
    const myRef = React.createRef();
    const wrapper = mountEnzymeWithTheme(<TextBlock elementRef={myRef} />);
    expect(myRef.current).toBe(wrapper.getDOMNode());
  });
});

import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountEnzymeWithThemeIntl, renderEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { getColor, theme } from 'z-frontend-theme';

import { TextInline } from '../index';

const messages = {
  foo: 'bar',
};

describe('TextInline', () => {
  it('should render a `<span>` by default', () => {
    const rendered = renderEnzymeWithThemeIntl(<TextInline>foo</TextInline>);
    expect(rendered.is('span')).toBe(true);
  });

  it('should render what you specify in `tag`', () => {
    const rendered = renderEnzymeWithThemeIntl(<TextInline tag="small">foo</TextInline>);
    expect(rendered.is('small')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextInline p={123}>foo</TextInline>);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect text props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextInline textTransform="uppercase">foo</TextInline>);
    expect(mounted).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('should respect i18n props', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextInline textKey="foo" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
  });

  it('should respect fontStyle prop', () => {
    const mounted = mountEnzymeWithThemeIntl(<TextInline fontStyle="paragraphs.l">foo</TextInline>);
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
    const mounted = mountEnzymeWithThemeIntl(<TextInline textKey="foo" fontStyle="paragraphs.l" />, { messages });
    expect(mounted.text()).toBe(messages.foo);
    expect(mounted).toHaveStyleRule('font-size', '16px');
  });

  it('color prop should override fontStyle', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <TextInline fontStyle="paragraphs.l" color="primary.a">
        foo
      </TextInline>,
    );
    expect(mounted).toHaveStyleRule('font-size', '16px');
    expect(mounted).toHaveStyleRule('color', `${getColor('primary.a')}`);
  });

  it('bold prop should override fontStyle', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <TextInline bold fontStyle="paragraphs.l">
        foo
      </TextInline>,
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
    const mounted = mountEnzymeWithThemeIntl(<TextInline fontStyle={['controls.s', 'controls.xxl']}>foo</TextInline>);
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
    const rendered = renderEnzymeWithTheme(<TextInline fontStyle="headings.m">foo</TextInline>);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });

  it('should pass ref down', () => {
    const myRef = React.createRef();
    const wrapper = mountEnzymeWithThemeIntl(<TextInline elementRef={myRef} />);
    expect(myRef.current).toBe(wrapper.getDOMNode());
  });
});

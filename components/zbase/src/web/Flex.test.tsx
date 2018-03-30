import React from 'react';
import 'jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Flex } from './index';
import { getColor, theme } from 'z-frontend-theme';

describe('Flex', () => {
  it('should render a `<div>`', () => {
    const rendered = renderWithTheme(<Flex />);
    expect(rendered.is('div')).toBe(true);
  });

  it('should always be `display:flex`', () => {
    const mounted = mountWithTheme(<Flex />);
    expect(mounted).toHaveStyleRule('display', 'flex');
  });

  it('should respect util props', () => {
    const mounted = mountWithTheme(<Flex p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });

  it('should respect responsive util props', () => {
    const mounted = mountWithTheme(<Flex width={[1, 1 / 2]} />);
    expect(mounted).toHaveStyleRule('width', '50%', {
      media: 'screen and (min-width:32em)',
    });
  });

  it('should support border props', () => {
    const withDefaultBorder = mountWithTheme(<Flex border />);
    expect(withDefaultBorder).toHaveStyleRule('border-style', `solid`);
    expect(withDefaultBorder).toHaveStyleRule('border-width', `1px`);
    expect(withDefaultBorder).toHaveStyleRule('border-color', `${getColor(theme.borderColor)}`);

    const withCustomBorderColor = mountWithTheme(<Flex borderBottom borderRight borderColor="primary.a" />);
    expect(withCustomBorderColor).toHaveStyleRule('border-bottom-width', `1px`);
    expect(withCustomBorderColor).toHaveStyleRule('border-bottom-color', `${getColor('primary.a')}`);
    expect(withCustomBorderColor).toHaveStyleRule('border-right-width', `1px`);
    expect(withCustomBorderColor).toHaveStyleRule('border-right-color', `${getColor('primary.a')}`);
  });

  it('should not render passed util props as attributes', () => {
    const rendered = renderWithTheme(
      <Flex p={123} mt={456} flex="1" justify="flex-start" align="center" direction="column" column wrap order={2} />,
    );
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});

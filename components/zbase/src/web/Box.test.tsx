import React from 'react';
import 'jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Box } from './index';
import { styled, getColor, theme } from 'z-frontend-theme';

const anyValue = /.*/;

describe('Box', () => {
  it('should render a `<div>`', () => {
    const rendered = renderWithTheme(<Box />);
    expect(rendered.is('div')).toBe(true);
  });

  it('should respect util props', () => {
    const mounted = mountWithTheme(<Box p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });

  it('should respect responsive util props', () => {
    const mounted = mountWithTheme(<Box width={[1, 1 / 2]} />);
    expect(mounted).toHaveStyleRule('width', '50%', {
      media: 'screen and (min-width:32em)',
    });
  });

  it('should support border props', () => {
    const withoutBorder = mountWithTheme(<Box />);
    expect(withoutBorder).not.toHaveStyleRule('border', anyValue);
    expect(withoutBorder).not.toHaveStyleRule('border-color', anyValue);

    const withDefaultBorder = mountWithTheme(<Box border />);
    expect(withDefaultBorder).toHaveStyleRule('border-style', `solid`);
    expect(withDefaultBorder).toHaveStyleRule('border-width', `1px`);
    expect(withDefaultBorder).toHaveStyleRule('border-color', `${getColor(theme.borderColor)}`);

    const withCustomBorderColor = mountWithTheme(<Box borderBottom borderRight borderColor="primary.a" />);
    expect(withCustomBorderColor).toHaveStyleRule('border-bottom-width', `1px`);
    expect(withCustomBorderColor).toHaveStyleRule('border-bottom-color', `${getColor('primary.a')}`);
    expect(withCustomBorderColor).toHaveStyleRule('border-right-width', `1px`);
    expect(withCustomBorderColor).toHaveStyleRule('border-right-color', `${getColor('primary.a')}`);

    const withBorderOff = mountWithTheme(<Box border={false} />);
    expect(withBorderOff).not.toHaveStyleRule('border', anyValue);
    expect(withBorderOff).not.toHaveStyleRule('border-color', anyValue);
  });

  it('should not render passed util props as attributes', () => {
    const rendered = renderWithTheme(<Box p={123} mt={456} flex="1" order={2} />);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });

  it('should not render util props as attributes for extended components', () => {
    const StyledBox = styled(Box)`
      position: relative;
    `;
    StyledBox.defaultProps = {
      m: 2,
      p: [1, 2, 3],
    };
    const rendered = renderWithTheme(<StyledBox pl={2} mb={2} flex="1" order={2} />);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});

import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import { Image } from '../index';

const src =
  'https://zenefits.imgix.net/67d4bfa36fc99162e37c488c9257c46b58f4cd12/static/out/3d5b884871c3ffb4e77f7283bcbf680c.svg';

const common = {
  alt: 'test',
};

describe('Image', () => {
  it('should render a `<img>`', () => {
    const rendered = mountEnzymeWithTheme(<Image {...common} />);
    expect(rendered.find('img')).toHaveLength(1);
  });

  it('should render a `<img>` with provider source', () => {
    const rendered = renderEnzymeWithTheme(<Image src={src} {...common} />);
    expect(rendered.get(0).attribs.src).toBe(src);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<Image p={123} bg="grayscale.black" {...common} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('background-color', '#000');
  });

  it('width/height prop should override default', () => {
    const mounted = mountEnzymeWithTheme(<Image width={100} height={100} {...common} />);
    expect(mounted).toHaveStyleRule('width', '100px');
    expect(mounted).toHaveStyleRule('height', '100px');
  });

  it('should not render util props as attributes', () => {
    const rendered = renderEnzymeWithTheme(<Image p={123} bg="grayscale.black" {...common} />);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toEqual(['alt', 'class']);
  });
});

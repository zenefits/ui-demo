import React from 'react';
import { Provider } from 'rebass';
import { injectGlobal } from 'styled-components';
import colors from './colors';
import oldColors from './oldColors';
import icons from './icons';
import { fonts, fontSizes, weights, typographyRules } from './fonts';

const useOldTheme = false;

export const opacities = [0.65];
export const borderRadius = 3;

// TODO: move to another place
const images = {
  logo:
    'https://zenefits.imgix.net/a9e6497202003e81522e474adcb4db9199c34c20/static/out/8617341ddccd7354e0612989ebfd2f2c.svg',
};
export const theme = {
  colors,
  fontSizes,
  fonts,
  weights,
  opacities,
  icons,
  images,
  radius: borderRadius,
  font: fonts[0],
  space: [0, 4, 8, 16, 24, 32, 64, 128],
};
if (useOldTheme) {
  theme.colors = oldColors;
  theme.images.logo = 'http://secure.zenefits.com/static/img/zenefits-logo-bird.png';
}

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; background-color: ${colors.primary['3a']} }
  ${typographyRules}
`;

export default function zFrontendThemeProvider({ children }) {
  return <Provider theme={theme}>{children}</Provider>;
}

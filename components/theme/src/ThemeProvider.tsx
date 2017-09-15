import React from 'react';
import { Provider } from 'rebass';
import { injectGlobal } from 'styled-components';
import colors from './colors';
import icons from './icons';
import { fonts, fontSizes, weights, typographyRules } from './fonts';

export const opacities = [0.65];
export const borderRadius = 3;

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
  ${typographyRules}
`;

export default function zFrontendThemeProvider({ children }) {
  return (
    <Provider theme={{ colors, fontSizes, fonts, weights, opacities, icons, radius: borderRadius, font: fonts[0] }}>
      {children}
    </Provider>
  );
}

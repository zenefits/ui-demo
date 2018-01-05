import React, { StatelessComponent } from 'react';
/* tslint:disable:import-filter */
import {
  ThemedStyledComponentsModule,
  keyframes as baseKeyframes,
  injectGlobal as baseInjectGlobal,
  default as baseStyled,
  ThemeProvider as BaseThemeProvider,
  css as baseCss,
  withTheme as baseWithTheme,
} from 'styled-components';
/* tslint:enable:import-filter */
import { theme, ThemeInterface } from './theme';
import { typographyRules } from './fonts';
import colors from './colors';

const { default: styled, css, withTheme, ThemeProvider, injectGlobal, keyframes } = {
  default: baseStyled,
  css: baseCss,
  keyframes: baseKeyframes,
  injectGlobal: baseInjectGlobal,
  withTheme: baseWithTheme,
  ThemeProvider: BaseThemeProvider,
} as ThemedStyledComponentsModule<ThemeInterface>;

const ZFrontendThemeProvider: StatelessComponent<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: ${colors.secondary.c};
    font-family: ${theme.fonts[0]};
  }

  ${typographyRules}
`;

function createThemeProvider() {
  return [ZFrontendThemeProvider, {}];
}

export { ZFrontendThemeProvider, createThemeProvider, styled, css, withTheme, injectGlobal, keyframes };

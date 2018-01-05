import React, { StatelessComponent } from 'react';
/* tslint:disable:import-filter */
import {
  ThemedStyledComponentsModule,
  keyframes as baseKeyframes,
  injectGlobal as baseInjectGlobal,
  ThemeProviderComponent,
} from 'styled-components';
import {
  StyledInterface,
  default as baseStyled,
  ThemeProvider as BaseThemeProvider,
  css as baseCss,
  withTheme as baseWithTheme,
} from 'styled-components/native';
/* tslint:enable:import-filter */
import { theme, ThemeInterface } from './theme';

const { default: styled, css, withTheme, ThemeProvider } = {
  default: baseStyled,
  css: baseCss,
  keyframes: baseKeyframes,
  injectGlobal: baseInjectGlobal,
  withTheme: baseWithTheme,
  ThemeProvider: BaseThemeProvider as ThemeProviderComponent<ThemeInterface>,
} as ThemedStyledComponentsModule<ThemeInterface>;

const ZFrontendThemeProvider: StatelessComponent<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// typings for styled-components/native does not support passing Theme interface yet
const styledTyped = styled as StyledInterface;

function createThemeProvider() {
  return [ZFrontendThemeProvider, {}];
}

export { ZFrontendThemeProvider, createThemeProvider, styledTyped as styled, css, withTheme };

import React, { StatelessComponent } from 'react';
/* tslint:disable:import-filter */
import {
  injectGlobal as baseInjectGlobal,
  keyframes as baseKeyframes,
  ThemedStyledComponentsModule,
  ThemeProviderComponent,
} from 'styled-components';
import {
  css as baseCss,
  default as baseStyled,
  withTheme as baseWithTheme,
  StyledInterface,
  ThemeProvider as BaseThemeProvider,
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

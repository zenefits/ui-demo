import { colors, ColorString, theme, ThemeInterface } from './common';
import generateUtilComponents from './src/utilsSystem/utilsComponentsWeb';
import { UtilPropsWeb } from './src/utilsSystem/utilHocFactory';

import {
  ZFrontendThemeProvider as ThemeProvider,
  createThemeProvider,
  withTheme,
  styled,
  css,
  keyframes,
} from './src/ThemeProvider';

const utilComponents = generateUtilComponents<ThemeInterface>(styled, css);

export const Flex = utilComponents.Flex;
export const Box = utilComponents.Box;

export {
  colors,
  ColorString,
  theme,
  ThemeInterface,
  ThemeProvider,
  createThemeProvider,
  withTheme,
  styled,
  css,
  keyframes,
  UtilPropsWeb as UtilProps,
};

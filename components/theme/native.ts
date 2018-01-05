import { colors, ColorString, theme, ThemeInterface } from './common';
import generateUtilComponents from './src/utilsSystem/utilsComponentsNative';
import { UtilPropsNative } from './src/utilsSystem/utilHocFactory';

import {
  ZFrontendThemeProvider as ThemeProvider,
  createThemeProvider,
  withTheme,
  styled,
  css,
} from './src/ThemeProviderNative';

const utilComponents = generateUtilComponents<ThemeInterface>(styled, css);

export const Flex = utilComponents.Flex;
export const View = utilComponents.View;
export const ScrollView = utilComponents.ScrollView;
export const Text = utilComponents.Text;
export const TextInput = utilComponents.TextInput;
export const TouchableHighlight = utilComponents.TouchableHighlight;

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
  UtilPropsNative as UtilProps,
};

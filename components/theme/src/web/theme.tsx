/* tslint:disable:import-filter */
import {
  keyframes as baseKeyframes,
  injectGlobal as baseInjectGlobal,
  ThemedStyledComponentsModule,
} from 'styled-components';
/* tslint:enable:import-filter */
import { fonts, fontSizes, weights, fontStyles } from './fonts';
import { ThemeInterfaceCommon, themeCommon } from '../themeCommon';
import zIndex from '../zIndex';

const opacities = [0.65];

const themeObject = {
  ...themeCommon,
  fontSizes,
  fontStyles,
  fonts,
  weights,
  zIndex,
  iconFont: 'Material-Design-Iconic-Font',
  font: fonts[0],
  // min-width breakpoints in ems
  breakpoints: [32, 48, 64, 80],
};

interface ThemeInterface extends ThemeInterfaceCommon {
  fontSizes: typeof themeObject.fontSizes;
  fontStyles: typeof themeObject.fontStyles;
  fonts: typeof themeObject.fonts;
  font: typeof themeObject.font;
  weights: typeof themeObject.weights;
  breakpoints: typeof themeObject.breakpoints;
  zIndex: typeof themeObject.zIndex;
}

const theme: ThemeInterface = themeObject;

const { keyframes, injectGlobal } = {
  keyframes: baseKeyframes,
  injectGlobal: baseInjectGlobal,
} as ThemedStyledComponentsModule<ThemeInterface>;

export { opacities, injectGlobal, ThemeInterface, theme, keyframes };
